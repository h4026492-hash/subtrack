import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { askAi } from "../src/api/aiApi";

export default function AiScreen() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await askAi(text.trim());
      setResult(res);
    } catch (e) {
      console.error("AI ERROR", e);
      setError("Failed to parse text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#0f172a" }}>
      <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>AI Subscription Parser</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Example: I pay 15 dollars every month for Netflix premium"
        placeholderTextColor="#64748b"
        style={{ marginTop: 16, padding: 14, borderRadius: 12, backgroundColor: "#020617", color: "white" }}
        multiline
      />

      <Pressable
        onPress={handleParse}
        style={{ marginTop: 16, padding: 14, borderRadius: 12, backgroundColor: "#2563eb", alignItems: "center" }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Parse with AI</Text>
      </Pressable>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} color="white" />}

      {error && <Text style={{ color: "#f87171", marginTop: 12 }}>{error}</Text>}

      {result && (
        <View style={{ marginTop: 24, padding: 16, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.08)" }}>
          <Text style={{ color: "white", fontSize: 18 }}>{result.provider}</Text>
          <Text style={{ color: "#94a3b8" }}>Plan: {result.plan}</Text>
          <Text style={{ color: "#94a3b8" }}>${result.price} / {result.billingCycle}</Text>
        </View>
      )}
    </View>
  );
}
 

