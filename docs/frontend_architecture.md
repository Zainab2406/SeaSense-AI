# Next.js Admin Dashboard Architecture

## 1. Folder Structure (src directory)

```
src/
├── app/                  # App Router: pages, layouts, loading, errors
│   ├── (auth)/           # Route group for auth (login, register)
│   ├── dashboard/        # Dashboard layout and sub-pages
│   │   ├── home/
│   │   ├── vessels/
│   │   ├── tracking/
│   │   └── analytics/
│   └── api/              # Route handlers (if needed)
├── components/           # Reusable UI components
│   ├── common/           # Buttons, Inputs, Modals
│   ├── forms/            # Form components using react-hook-form
│   ├── layout/           # Sidebar, Navbar, Footer
│   └── tracking/         # Map, VesselList, Alerts
├── hooks/                # Custom React hooks (useAuth, useSocket)
├── lib/                  # Library configurations (axios, socket.io-client)
├── services/             # API service layer (vesselService, authService)
├── store/                # Client-state (Zustand or React Context)
├── types/                # TypeScript interfaces and types
└── utils/                # Helper functions (formatters, validators)
```

## 2. Auth Flow Architecture
- **Storage**: JWT stored in `HttpOnly` cookies (via backend) or secure local storage with a middleware check.
- **Middleware**: Next.js `middleware.ts` will protect `/dashboard/*` routes by verifying the presence of a token and optionally checking roles via a decoded JWT.
- **Hook**: `useAuth` hook powered by React Context to provide user state globally.

## 3. API Service Layer Pattern
Use a central Axios instance with interceptors for request/response handling.

```typescript
// src/lib/api-client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

## 4. WebSocket Client Integration
Use a singleton pattern or a React provider to manage the Socket.IO connection.

```typescript
// src/hooks/useTrackingSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useTrackingSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/tracking`, {
      auth: { token: localStorage.getItem('token') },
    });
    setSocket(s);
    return () => { s.disconnect(); };
  }, []);

  return socket;
};
```

## 5. State Management & Data Fetching
- **React Query**: For server-state (caching, revalidation of vessel lists, etc.).
- **Zustand**: For lightweight client-state (sidebar toggle, current selected vessel on map).
