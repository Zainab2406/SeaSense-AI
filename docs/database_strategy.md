# Database Strategy Documentation

## Recommended Database Extensions
- **postgis**: Enables geographic and geometric types/functions.
- **uuid-ossp**: Provides functions to generate Universally Unique Identifiers (UUIDs).

## Indexing Strategy

### 1. Spatial Indexing (GiST)
- **Problem**: Querying geographic areas (like geofencing) is extremely slow with B-Tree indexes.
- **Solution**: GiST (Generalized Search Tree) indexes are used for the `geom` columns in `LocationPoint` and `Zone`.
- **Implementation**:
  ```sql
  CREATE INDEX location_point_geom_idx ON "LocationPoint" USING GIST (geom);
  CREATE INDEX zone_geom_idx ON "Zone" USING GIST (geom);
  ```

### 2. Relational & Search Indexing (B-Tree)
- **Vessel Identifiers**: Unique B-Tree indexes on `imo` and `mmsi` ensure fast lookup and integrity.
- **Foreign Keys**: Indexes on `vesselId`, `tripId`, and `roleId` avoid sequential scans during joins.
- **Temporal Data**: The `timestamp` in `LocationPoint` is indexed to speed up historical path and playback queries.
- **Audit/Soft Delete**: `deletedAt` is implicitly checked in many queries; if the table grows large, a partial index `WHERE "deletedAt" IS NULL` should be considered.

## Geospatial Support (PostGIS)

### How to Enable
1. Ensure PostGIS is installed on your PostgreSQL server.
2. In the Prisma schema, the `postgresqlExtensions` preview feature is enabled.
3. The schema includes `extensions = [postgis]`.
4. Run the first migration using `npx prisma migrate dev`.

### Handling Geospatial Data in Code
Since Prisma doesn't natively map `Unsupported` types to JS objects perfectly, you will need to use raw SQL for spatial queries:
```typescript
// Example: Find points within 1km of a coordinate
const nearby = await prisma.$queryRaw`
  SELECT * FROM "LocationPoint"
  WHERE ST_DWithin(geom, ST_MakePoint(${lng}, ${lat})::geography, 1000)
`;
```

## Migration Strategy
1. **Initial Baseline**: Run `npx prisma migrate dev --name init`. Prisma will attempt to create the tables.
2. **Post-Migration Scripts**: Use `prisma/migrations/<timestamp>_init/migration.sql` to verify the extensions are created before the tables.
3. **Soft Delete**: All relevant models include a `deletedAt` field. The API layer (NestJS) will be responsible for filtering these out in standard queries or using a Prisma middleware.

## Soft Delete Implementation
A global Prisma middleware or extension is recommended to automatically filter out entities where `deletedAt` is not null:
```typescript
prisma.$use(async (params, next) => {
  if (params.model === 'Vessel' && params.action === 'findUnique') {
    // Modify query to exclude deleted
  }
  return next(params);
});
```
