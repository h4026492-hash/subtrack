import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { login } from "../src/api/authApi";
import { setSessionToken } from "../src/auth/session";

export default function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await login(email, password);
      console.log("TOKEN RECEIVED", token);

      setSessionToken(token); // store in-memory for API requests
      // Persist token for future sessions
      // setToken is async; do not await to avoid blocking UX here (we rely on session for immediate requests)
      // but fire-and-forget persistence is fine
      import("../src/auth/token").then((mod) => mod.setToken(token)).catch(() => {});

      router.replace("/dashboard");
    } catch (e: any) {
      console.error("LOGIN FAILED", e?.response?.status, e?.message);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#020617",
      }}
    >
      <Text style={{ color: "white", fontSize: 28, marginBottom: 20 }}>
        Login
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        style={{
          backgroundColor: "#0f172a",
          color: "white",
          padding: 14,
          borderRadius: 10,
          marginBottom: 12,
        }}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        style={{
          backgroundColor: "#0f172a",
          color: "white",
          padding: 14,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      {error ? <Text style={{ color: "#f87171", marginBottom: 12 }}>{error}</Text> : null}

      <Pressable
        onPress={handleLogin}
        disabled={loading}
        style={{ padding: 16, backgroundColor: loading ? "#94a3b8" : "#2563eb", borderRadius: 10 }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Login</Text>
        )}
      </Pressable>
    </View>
  );
}
