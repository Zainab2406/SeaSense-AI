import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { socket } from "../services/socket";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    const token = response.data.access_token;

    await AsyncStorage.setItem("token", token);

    socket.auth = { token };
    socket.connect();

    setUser(response.data.user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    socket.disconnect();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
