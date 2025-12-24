// Clean Add screen (single implementation)
import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createSubscription } from "../src/api/subscriptionApi";

export default function AddSubscription() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [provider, setProvider] = useState("");
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.provider) setProvider(String(params.provider));
    if (params.plan) setPlan(String(params.plan));
    if (params.price) setPrice(String(params.price));
    if (params.billingCycle) {
      setBillingCycle(params.billingCycle as "MONTHLY" | "YEARLY");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    if (!provider || !plan || !price) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createSubscription({ provider, plan, price: Number(price), billingCycle });
      router.replace("/dashboard");
    } catch (e) {
      console.error("ADD SUBSCRIPTION ERROR", e);
      setError("Failed to add subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#0f172a" }}>
      <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>Add Subscription</Text>

      <TextInput
        placeholder="Provider (Netflix)"
        placeholderTextColor="#94a3b8"
        value={provider}
        onChangeText={setProvider}
        style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white", padding: 14, borderRadius: 12, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Plan (Premium)"
        placeholderTextColor="#94a3b8"
        value={plan}
        onChangeText={setPlan}
        style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white", padding: 14, borderRadius: 12, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Price"
        placeholderTextColor="#94a3b8"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white", padding: 14, borderRadius: 12, marginBottom: 12 }}
      />

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Pressable onPress={() => setBillingCycle("MONTHLY")} style={{ flex: 1, padding: 14, marginRight: 8, borderRadius: 12, backgroundColor: billingCycle === "MONTHLY" ? "#22c55e" : "rgba(255,255,255,0.1)" }}>
          <Text style={{ color: "white", textAlign: "center" }}>Monthly</Text>
        </Pressable>
        <Pressable onPress={() => setBillingCycle("YEARLY")} style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: billingCycle === "YEARLY" ? "#22c55e" : "rgba(255,255,255,0.1)" }}>
          <Text style={{ color: "white", textAlign: "center" }}>Yearly</Text>
        </Pressable>
      </View>

      {error && <Text style={{ color: "#f87171", marginBottom: 12 }}>{error}</Text>}

      <Pressable onPress={submit} disabled={loading} style={{ backgroundColor: "#22c55e", padding: 16, borderRadius: 14, alignItems: "center" }}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontSize: 16 }}>Save Subscription</Text>}
      </Pressable>
    </View>
  );
}
