import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { getToken } from "../auth/token";

// Determine a sensible base URL for development on simulators/devices:
// - Android emulator (AVD): 10.0.2.2
// - iOS simulator: localhost
// - Physical device: use the debugger host IP exposed by Expo manifest, if available
const getDevHost = () => {
  // If an explicit override is provided via Expo config or env, prefer that
  // (set EXPO_PUBLIC_API_URL or expo.extra.API_URL in app.config)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - Some Expo projects use expoConfig instead of manifest
  const manifest = Constants.manifest || (Constants as any).expoConfig;
  const maybeApiUrl =
    process.env.EXPO_PUBLIC_API_URL || // Vite/Expo public env
    (manifest && manifest.extra && manifest.extra.API_URL) ||
    undefined;

  if (maybeApiUrl) return maybeApiUrl.replace(/https?:\/\//, "");

  if (Platform.OS === "android") return "10.0.2.2";

  // If Expo provides the debuggerHost (e.g. '192.168.1.10:19000'), use the IP part
  const debuggerHost = manifest && manifest.debuggerHost;
  if (typeof debuggerHost === "string") {
    return debuggerHost.split(":")[0];
  }

  // Default to localhost (works for iOS simulator)
  return "localhost";
};

const DEFAULT_PORT = 8081;
const BASE_URL = (() => {
  // If a full URL is provided via env, use it directly
  const full = process.env.EXPO_PUBLIC_API_URL || (Constants.manifest && Constants.manifest.extra && Constants.manifest.extra.API_URL);
  if (full && (full.startsWith("http://") || full.startsWith("https://"))) return full;

  // For development builds use the computed host
  const host = getDevHost();
  return `http://${host}:${DEFAULT_PORT}`;
})();

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Attach authorization header if token exists
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

export default apiClient;

