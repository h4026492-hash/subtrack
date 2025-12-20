// Centralized configuration values
// Use EXPO_PUBLIC_API_BASE_URL for different environments (set via dotenv or Expo config)
// Default to the backend's configured port (subscriptionservice uses 8081)
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8081";
