import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");

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
        <Text style={{ fontSize: 28, color: "#fff", marginBottom: 8 }}>Subtrack</Text>

        <Text style={{ color: "#9CA3AF", marginBottom: 24 }}>
          Track and optimize your subscriptions
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            padding: 16,
            borderRadius: 14,
            color: "#fff",
            marginBottom: 20,
          }}
        />

        <Pressable
          onPress={() => router.replace("/dashboard")}
          style={({ pressed }) => ({
            backgroundColor: "#4F8EF7",
            padding: 16,
            borderRadius: 16,
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.97 : 1 }],
          })}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
