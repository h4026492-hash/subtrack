// Centralized configuration values
// Use EXPO_PUBLIC_API_BASE_URL for different environments (set via dotenv or Expo config)
// Default to localhost:8080 to match local backend that may run on that port.
// You can override this by setting EXPO_PUBLIC_API_BASE_URL in your environment or app config.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8080";
