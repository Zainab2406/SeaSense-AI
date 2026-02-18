import axios from "axios";
import { API_BASE } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export const startTrip = async (vesselId: string, startTime: string) => {
  return api.post(`/trips/${vesselId}/start`, { startTime });
};

export const endTrip = async (tripId: string, endTime: string) => {
  return api.post(`/trips/${tripId}/end`, { endTime });
};

export const updateLocationBackground = async (payload: any) => {
  return api.post("/location/update", payload);
};
