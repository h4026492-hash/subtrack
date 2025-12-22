import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { login } from "../src/api/authApi";

export default function Login() {
  // using named `router` import from expo-router
  // keep file minimal and safe for testing
  // navigation status debug removed

  const handleLogin = async () => {
    try {
      const res = await login("test@test.com", "test");
      console.log("LOGIN RESPONSE", res);
      router.replace("/dashboard");
    } catch (err) {
      console.error("LOGIN FAILED", err);
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
            <Button title="Login" onPress={handleLogin} />
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
        {/* debug UI removed */}
      </View>
    </View>
  );
}
