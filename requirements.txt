SEASENSE SYSTEM REQUIREMENTS & SETUP GUIDE

--- SOFTWARE PREREQUISITES ---
1. Node.js (v20.x or higher)
2. PostgreSQL (v15+) with PostGIS Extension installed
3. Redis Server (v6.x+)
4. Google Maps API Key (with 'Maps JavaScript API' and 'Advanced Markers' enabled)

--- BACKEND SETUP (Root Folder) ---
1. Install dependencies:
   npm install

2. Create a '.env' file:
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/sea_sense?schema=public"
   JWT_SECRET="your_secure_random_string"
   JWT_EXPIRATION="1d"
   REDIS_HOST="localhost"
   REDIS_PORT=6379

3. Initialize Database:
   npx prisma generate
   npx prisma db push

4. Start Server:
   npm run start:dev (Port: 3000)

--- FRONTEND SETUP (dashboard/ Folder) ---
1. Navigate to folder:
   cd dashboard

2. Install dependencies:
   npm install

3. Create a '.env.local' file:
   NEXT_PUBLIC_SOCKET_URL="http://localhost:3000"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"

4. Start Dashboard:
   npm run dev (Port: 3001)

--- NOTES ---
- Ensure the 'postgis' extension is enabled in your database: CREATE EXTENSION postgis;
- The dashboard is accessible at http://localhost:3001
- Use the 'tracking' namespace for WebSocket connections.
