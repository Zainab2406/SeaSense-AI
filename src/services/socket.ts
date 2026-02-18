import { io } from "socket.io-client";
import { API_BASE } from "./config";

export const socket = io(`${API_BASE}/tracking`, {
  autoConnect: false,
});
