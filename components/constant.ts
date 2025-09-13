// constants.ts
import { Platform } from "react-native";

// 🔹 metti qui l'IP del tuo PC nella rete locale
const LOCAL_IP = "192.168.1.105"; // il tuo IP locale

export const API_BASE_URL =
  Platform.OS === "android"
    ? `http://${LOCAL_IP}:5000/api` // emulator/telefono Android
    : `http://${LOCAL_IP}:5000/api`; // iOS (emulatore o reale)
