import React, { useState } from "react";
import { View, Button } from "react-native";
import { api } from "../services/api";
import { socket } from "../services/socket";
import { startLocationWatcher, stopLocationWatcher } from "../hooks/useLocationSender";

export default function TripScreen() {
  const [tripId, setTripId] = useState<string | null>(null);

  const startTrip = async () => {
    const response = await api.post("/trips/start");
    const id = response.data.tripId;
    setTripId(id);

    startLocationWatcher(id);
  };

  const endTrip = async () => {
    await api.post("/trips/end", { tripId });
    stopLocationWatcher();
    setTripId(null);
  };

  const triggerSOS = () => {
    socket.emit("sos_triggered", { tripId });
  };

  return (
    <View>
      <Button title="Start Trip" onPress={startTrip} />
      <Button title="End Trip" onPress={endTrip} />
      <Button title="SOS" onPress={triggerSOS} color="red" />
    </View>
  );
}
