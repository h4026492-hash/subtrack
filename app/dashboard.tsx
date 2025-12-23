import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getDashboard } from "../src/api/dashboardApi";
import GlassCard from "../components/GlassCard";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (e) {
        console.error("DASHBOARD ERROR", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!dashboard) {
    return <Text style={{ padding: 20 }}>No data</Text>;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#020617" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "700",
          marginBottom: 4,
        }}
      >
        Dashboard
      </Text>

      <Text style={{ color: "#94a3b8", fontSize: 16 }}>
        Track and optimize your subscriptions
      </Text>

      <GlassCard>
        <Text style={{ color: "#cbd5f5", fontSize: 14 }}>Total Monthly Spend</Text>
        <Text
          style={{
            color: "white",
            fontSize: 36,
            fontWeight: "700",
            marginTop: 8,
          }}
        >
          ${dashboard.totalMonthly}
        </Text>
      </GlassCard>

      <Text
        style={{
          color: "white",
          fontSize: 22,
          fontWeight: "600",
          marginTop: 32,
        }}
      >
        Your Subscriptions
      </Text>

      {dashboard.subscriptions.map((s: any) => (
        <GlassCard key={s.id}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{s.plan}</Text>
          <Text style={{ color: "#94a3b8", marginTop: 4 }}>${s.price} / month</Text>
        </GlassCard>
      ))}
    </ScrollView>
  );
}



