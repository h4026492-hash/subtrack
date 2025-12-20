import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1220" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "600",
          color: "#fff",
          marginBottom: 24,
        }}
      >
        Dashboard
      </Text>

      {/* Glass Card – Monthly Spend */}
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#aaa", marginBottom: 8 }}>Monthly Spend</Text>
        <Text style={{ fontSize: 32, color: "#fff", fontWeight: "600" }}>$126.40</Text>

        <Text style={{ color: "#7dd3fc", marginTop: 8 }}>↑ 12% from last month</Text>
      </View>

      {/* Glass Card – AI Insight */}
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#aaa", marginBottom: 8 }}>AI Insight</Text>

        <Text style={{ color: "#fff", lineHeight: 22 }}>
          You are spending more on entertainment subscriptions. Consider
          cancelling unused services to save approximately $18 per month.
        </Text>
      </View>

      {/* Actions */}
      <View style={{ gap: 14 }}>
        <Pressable
          onPress={() => router.push("/subscriptions")}
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>View Subscriptions</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/add")}
          style={{
            backgroundColor: "#4F8EF7",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Add Subscription</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/ai")}
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Ask AI Assistant</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

