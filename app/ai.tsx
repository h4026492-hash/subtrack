import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { parseAiText } from "../src/api/aiApi";

export default function AiParseScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await parseAiText(text.trim());

      router.push({
        pathname: "/add",
        params: {
          provider: res.provider ?? undefined,
          plan: res.plan ?? undefined,
          price: res.price ?? undefined,
          billingCycle: res.billingCycle ?? undefined,
        },
      });
    } catch (e) {
      console.error("AI PARSE ERROR", e);
      setError("Failed to analyze text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#0f172a" }}>
      <Text style={{ color: "white", fontSize: 22, marginBottom: 12 }}>AI Assist</Text>

      <TextInput
        placeholder="e.g., I pay 15 dollars every month for Netflix premium"
        placeholderTextColor="#94a3b8"
        value={text}
        onChangeText={setText}
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          color: "white",
          padding: 14,
          borderRadius: 12,
          minHeight: 80,
          marginBottom: 12,
        }}
        multiline
      />

      {error && <Text style={{ color: "#f87171", marginBottom: 12 }}>{error}</Text>}

      <Pressable
        onPress={analyze}
        disabled={loading}
        style={{ backgroundColor: "#2563eb", padding: 14, borderRadius: 12, alignItems: "center" }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white" }}>Analyze</Text>
        )}
      </Pressable>
    </View>
  );
}
 

