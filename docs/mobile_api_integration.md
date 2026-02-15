# SeaSense Mobile API Integration Guide

This document provides the technical specifications for the React Native mobile application to interact with the SeaSense backend.

## 📦 Communication Methods

The mobile app should use:
1.  **REST API**: For authentication and trip management (Lifecycle).
2.  **WebSockets (Socket.io)**: For real-time location streaming and SOS alerts.

---

## 🔐 1. Authentication
All requests (except login/signup) require a Bearer Token in the `Authorization` header.

### Login
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "captain@seasense.com",
    "password": "secure_password"
  }
  ```
- **Response**: `{ "access_token": "JWT_TOKEN_HERE" }`

---

## ⚓ 2. Trip Management
A "Trip" must be active for a vessel to stream data.

### Start a Trip
- **Endpoint**: `POST /trips/:vesselId/start`
- **Body**: `{ "startTime": "2026-02-15T12:00:00Z" }`
- **Response**: `{ "id": "TRIP_UUID_HERE", ... }`

### End a Trip
- **Endpoint**: `POST /trips/:tripId/end`
- **Body**: `{ "endTime": "2026-02-15T18:00:00Z" }`

---

## 🛰️ 3. Real-time Tracking (WebSockets)
Connect to the `http://YOUR_SERVER_URL/tracking` namespace.

### Setup
Ensure you pass the JWT in the auth handshake:
```javascript
const socket = io("http://localhost:3000/tracking", {
  auth: { token: "JWT_TOKEN" }
});
```

### Stream Location Update
Emit this event every 5-30 seconds depending on vessel speed.
- **Event**: `location_update`
- **Payload**:
  ```json
  {
    "tripId": "TRIP_UUID",
    "latitude": 25.1234,
    "longitude": 55.1234,
    "speed": 15.2,
    "heading": 90,
    "timestamp": "ISO_DATE_STRING"
  }
  ```

### SOS Trigger
- **Event**: `sos_triggered`
- **Payload**:
  ```json
  {
    "tripId": "TRIP_UUID",
    "message": "Engine failure near sector 4",
    "timestamp": "ISO_DATE_STRING"
  }
  ```

---

## 📲 4. REST API Fallback
If WebSockets are disconnected, use this endpoint for background updates.

- **Endpoint**: `POST /location/update`
- **Body**: Same as the `location_update` WebSocket payload.

---

## 🛠️ Recommended Libraries for React Native
- **Socket.IO**: `socket.io-client`
- **HTTP Client**: `axios`
- **Geolocation**: `react-native-geolocation-service`
- **Background Tasks**: `react-native-background-fetch`
