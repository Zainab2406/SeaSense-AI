import React, { useContext, useEffect } from "react";
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
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import { startLocationWatcher, stopLocationWatcher, sendSOS } from "./src/hooks/useLocationSender";

function AppContent() {
  const isDarkMode = useColorScheme() === "dark";
  const { user, login, logout, startTrip, endTrip, currentTripId } = useContext(AuthContext);

  // ✅ permission request
  async function requestPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      console.log("Permission:", granted);
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  const handleLogin = async () => {
    try {
      // TODO: Replace with real UI input
      await login("captain@seasense.com", "secure_password");
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartTrip = async () => {
    try {
      const trip = await startTrip();
      if (trip) {
        startLocationWatcher(trip.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEndTrip = async () => {
    try {
      await endTrip();
      stopLocationWatcher();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View style={styles.container}>
        <Text style={styles.title}>SeaSense Trip Tracker</Text>

        {!user ? (
          <Button title="Login (Dev)" onPress={handleLogin} />
        ) : (
          <>
            <Text>Welcome, {user.email}</Text>
            <Text>Vessel: {user.vesselId}</Text>

            <View style={styles.spacer} />

            {!currentTripId ? (
              <Button title="Start Trip" onPress={handleStartTrip} />
            ) : (
              <>
                <Text style={styles.activeTrip}>Active Trip: {currentTripId}</Text>
                <Button title="End Trip" onPress={handleEndTrip} color="orange" />
                <View style={styles.spacer} />
                <Button title="🆘 SEND SOS 🆘" onPress={() => sendSOS(currentTripId)} color="red" />
              </>
            )}

            <View style={styles.spacer} />
            <Button title="Logout" onPress={logout} color="gray" />
          </>
        )}
      </View>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  activeTrip: {
    marginBottom: 10,
    color: "green",
    fontWeight: "bold",
  },
  spacer: {
    height: 20,
  },
});
