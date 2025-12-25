import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import RotatingCube from "@/components/RotatingCube";
import { login } from "../src/api/authApi";
import { setToken } from "../src/auth/token";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      await setToken(String(token));
      router.replace("/dashboard");
    } catch (e) {
      setError("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subtrack</Text>
      <Text style={styles.subtitle}>Track subscriptions effortlessly</Text>

      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <RotatingCube />
      </View>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 24,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 14,
    padding: 14,
    color: "white",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#f87171",
    marginBottom: 8,
  },
});
