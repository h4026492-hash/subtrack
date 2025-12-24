import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { login } from "../src/api/authApi";

export default function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test");

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      console.log("TOKEN RECEIVED", token);

      router.replace("/dashboard");
    } catch (e: any) {
      console.error("LOGIN FAILED", e?.response?.status);
      Alert.alert("Login failed", "Check credentials or backend");
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

      <Pressable
        onPress={handleLogin}
        style={{
          padding: 16,
          backgroundColor: "#2563eb",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Login
        </Text>
      </Pressable>
    </View>
  );
}
