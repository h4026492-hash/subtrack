import { View, Text, TextInput, Pressable, ActivityIndicator, Button } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { login } from "../src/api/authApi";
import { setToken } from "../src/auth/token";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log("LOGIN CLICKED");
    setLoading(true);
    try {
      const token = await login(email, password);
      console.log("LOGIN RESPONSE", token);
      await setToken(token);
      router.replace("/dashboard");
    } catch (e) {
      // simple error handling
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B1220",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 22,
          padding: 24,
        }}
      >
        <Text style={{ fontSize: 28, color: "#fff", marginBottom: 8 }}>SubTrack</Text>

        <Text style={{ color: "#9CA3AF", marginBottom: 24 }}>
          Track and optimize your subscriptions
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            padding: 16,
            borderRadius: 14,
            color: "#fff",
            marginBottom: 12,
          }}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            padding: 16,
            borderRadius: 14,
            color: "#fff",
            marginBottom: 20,
          }}
        />

        {/* Default platform button */}
        <View style={{ marginBottom: 12 }}>
          <Button title="Login" onPress={handleLogin} disabled={loading} />
        </View>

        {/* Styled login button (preserves loading spinner) */}
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={({ pressed }) => ({
            backgroundColor: "#4F8EF7",
            padding: 16,
            borderRadius: 16,
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.97 : 1 }],
            alignItems: 'center',
          })}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>Login (styled)</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
