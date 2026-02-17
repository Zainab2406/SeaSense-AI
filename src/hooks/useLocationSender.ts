import Geolocation from "react-native-geolocation-service";
import { socket } from "../services/socket";

let watchId: number | null = null;

export const startLocationWatcher = (tripId: string) => {
  watchId = Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, speed } = position.coords;

      socket.emit("location_update", {
        tripId,
        latitude,
        longitude,
        speed,
        heading: 0,
        timestamp: new Date().toISOString(),
      });
    },
    (error) => console.log(error),
    {
      enableHighAccuracy: true,
      distanceFilter: 5,
      interval: 5000,
    }
  );
};

export const stopLocationWatcher = () => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
  }
};
