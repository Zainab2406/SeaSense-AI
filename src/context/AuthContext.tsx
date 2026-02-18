import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, startTrip as startTripApi, endTrip as endTripApi } from "../services/api";
import { socket } from "../services/socket";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [currentTripId, setCurrentTripId] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.access_token;
      const userData = response.data.user;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      socket.auth = { token };
      socket.connect();

      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    socket.disconnect();
    setUser(null);
    setCurrentTripId(null);
  };

  const startTrip = async () => {
    if (!user || !user.vesselId) {
      console.error("No vessel associated with user");
      return;
    }
    try {
      const response = await startTripApi(user.vesselId, new Date().toISOString());
      setCurrentTripId(response.data.id);
      return response.data;
    } catch (error) {
      console.error("Failed to start trip:", error);
      throw error;
    }
  };

  const endTrip = async () => {
    if (!currentTripId) return;
    try {
      await endTripApi(currentTripId, new Date().toISOString());
      setCurrentTripId(null);
    } catch (error) {
      console.error("Failed to end trip:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, startTrip, endTrip, currentTripId }}>
      {children}
    </AuthContext.Provider>
  );
};
