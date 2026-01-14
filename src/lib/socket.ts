import { envVars } from "@/config/envVars";
import { io } from "socket.io-client";

export const socket = io(envVars.VITE_BASE_SOCKET_URL, {
  autoConnect: false,
});
