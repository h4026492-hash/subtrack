// Screen for adding a new subscription
// Simple form with name and monthly amount

import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { createSubscription } from "../src/api/subscriptionApi.js";

export default function AddSubscription() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const save = async () => {
    await createSubscription({
      name,
      amount: Number(amount),
      category,
    });
    router.replace("/subscriptions");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1220", padding: 24 }}>
      <Text style={{ fontSize: 28, color: "#fff", marginBottom: 24 }}>
        Add Subscription
      </Text>

      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 22,
          padding: 20,
        }}
      >
        <TextInput
          placeholder="Name"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "#fff",
            padding: 16,
            borderRadius: 14,
            marginBottom: 12,
          }}
        />

        <TextInput
          placeholder="Amount"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "#fff",
            padding: 16,
            borderRadius: 14,
            marginBottom: 12,
          }}
        />

        <TextInput
          placeholder="Category"
          placeholderTextColor="#9CA3AF"
          value={category}
          onChangeText={setCategory}
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "#fff",
            padding: 16,
            borderRadius: 14,
            marginBottom: 16,
          }}
        />

        <Pressable
          onPress={save}
          style={({ pressed }) => ({
            backgroundColor: "#4F8EF7",
            padding: 16,
            borderRadius: 16,
            opacity: pressed ? 0.85 : 1,
            transform: [{ scale: pressed ? 0.97 : 1 }],
          })}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Save Subscription
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
