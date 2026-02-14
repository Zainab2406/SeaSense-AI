# SeaSense - Real-time Vessel Tracking System

SeaSense is a comprehensive maritime fleet monitoring platform featuring sub-second location updates, advanced geospatial visualization, and a secure administration dashboard.

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v20 or higher
- **Docker**: For running PostgreSQL (PostGIS) and Redis
- **Google Maps API Key**: Required for the tracking map

### 2. Environment Setup
Create a `.env` file in the root directory (one already exists with defaults):
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sea_sense?schema=public"
JWT_SECRET="your_secure_secret"
JWT_EXPIRATION="1d"
REDIS_HOST="localhost"
REDIS_PORT=6379
```

And in `dashboard/.env.local`:
```env
NEXT_PUBLIC_SOCKET_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"
```

### 3. Backend (NestJS)
```bash
# Start Infrastructure (DB & Cache)
docker-compose up -d

# Install Dependencies
npm install

# Setup Database
npx prisma generate
npx prisma db push

# Run Backend
npm run start:dev
```

### 4. Frontend (Next.js Dashboard)
```bash
cd dashboard

# Install Dependencies
npm install

# Run Frontend
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) to view the dashboard.

## 📚 Documentation

The following architectural and design documents are available in the `docs/` folder:

- [Database Strategy](docs/database_strategy.md): Indexing, PostGIS, and Schema design.
- [WebSocket Architecture](docs/websocket_architecture.md): Real-time event contracts and scaling.
- [Frontend Architecture](docs/frontend_architecture.md): Dashboard structure and state management.
- [Tracking Page Design](docs/tracking_page_design.md): Detailed map implementation details.

## 🛠️ Tech Stack
- **Backend**: NestJS, Prisma 7, PostgreSQL (PostGIS), Redis, Socket.IO.
- **Frontend**: Next.js 15, Tailwind CSS, Zustand, TanStack Query, Google Maps JS API.

---
Created by Antigravity AI.
