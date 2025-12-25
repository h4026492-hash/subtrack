import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { askAi } from "../src/api/aiApi";
import { createSubscription } from "../src/api/subscriptionApi";
import { useRouter } from "expo-router";

export default function AiScreen() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const handleParse = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await askAi(text);
      setResult(res);
    } catch (e) {
      console.error("AI ERROR", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setSaving(true);

    try {
      await createSubscription({
        provider: result.provider,
        plan: result.plan,
        price: result.price,
        billingCycle: result.billingCycle,
      });

      router.replace("/"); // back to dashboard
    } catch (e) {
      console.error("SAVE ERROR", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#0f172a" }}>
      <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
        AI Subscription Parser
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Example: I pay 15 dollars every month for Netflix"
        placeholderTextColor="#64748b"
        multiline
        style={{ marginTop: 16, padding: 14, borderRadius: 12, backgroundColor: "#020617", color: "white" }}
      />

      <Pressable
        onPress={handleParse}
        style={{ marginTop: 16, padding: 14, borderRadius: 12, backgroundColor: "#2563eb", alignItems: "center" }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Parse with AI</Text>
      </Pressable>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} color="white" />}

      {result && (
        <View style={{ marginTop: 24, padding: 16, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.08)" }}>
          <Text style={{ color: "white", fontSize: 18 }}>{result.provider}</Text>
          <Text style={{ color: "#94a3b8" }}>Plan: {result.plan}</Text>
          <Text style={{ color: "#94a3b8" }}>${result.price} / {result.billingCycle}</Text>

          <Pressable
            onPress={handleSave}
            disabled={saving}
            style={{ marginTop: 16, padding: 14, borderRadius: 12, backgroundColor: "#22c55e", alignItems: "center", opacity: saving ? 0.7 : 1 }}
          >
            <Text style={{ color: "black", fontWeight: "700" }}>{saving ? "Saving..." : "Save Subscription"}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
 

