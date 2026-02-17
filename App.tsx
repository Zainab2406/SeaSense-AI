import React, { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Button,
  PermissionsAndroid,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Geolocation from "react-native-geolocation-service";

// 🔵 TEMP fake socket + api (replace later with your real ones)
const socket = {
  connect: () => console.log("socket connected"),git remote remove origin

  disconnect: () => console.log("socket disconnected"),
  emit: (event: string, data: any) =>
    console.log("emit:", event, data),
};

const api = {
  post: async (url: string, body?: any) => {
    console.log("API POST", url, body);
    return { data: { tripId: "trip_" + Date.now() } };
  },
};

export default function App() {
  const isDarkMode = useColorScheme() === "dark";
  const [tripId, setTripId] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // ✅ permission request
  async function requestPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    console.log("Permission:", granted);
  }

  useEffect(() => {
    requestPermission();
  }, []);

  // ✅ location watcher
  const startLocationWatcher = (tripId: string) => {
    const id = Geolocation.watchPosition(
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
      (error) => console.log("GPS error", error),
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 5000,
      }
    );

    watchIdRef.current = id;
  };

  // ✅ start trip
  const startTrip = async () => {
    const response = await api.post("/trips/start");
    const id = response.data.tripId;

    setTripId(id);
    socket.connect();
    startLocationWatcher(id);
  };

  // ✅ end trip
  const endTrip = async () => {
    if (!tripId) return;

    await api.post("/trips/end", { tripId });

    socket.disconnect();

    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
    }

    setTripId(null);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View style={styles.container}>
        <Text style={styles.title}>SeaSense Trip Tracker</Text>

        {!tripId ? (
          <Button title="Start Trip" onPress={startTrip} />
        ) : (
          <Button title="End Trip" onPress={endTrip} />
        )}

        {tripId && <Text>Active Trip: {tripId}</Text>}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
