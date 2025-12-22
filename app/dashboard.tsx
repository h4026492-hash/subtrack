import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getDashboard } from "../src/api/dashboardApi";

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
    <ScrollView style={{ padding: 16, backgroundColor: "#0f172a" }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "600" }}>
        Your Subscriptions
      </Text>

      <View
        style={{
          marginTop: 16,
          padding: 16,
          borderRadius: 16,
          backgroundColor: "rgba(255,255,255,0.08)",
        }}
      >
        <Text style={{ color: "#94a3b8" }}>Total Monthly Spend</Text>
        <Text style={{ color: "white", fontSize: 28 }}>${dashboard.totalMonthly}</Text>
      </View>

      {dashboard.subscriptions.map((s: any) => (
        <View
          key={s.id}
          style={{
            marginTop: 12,
            padding: 16,
            borderRadius: 16,
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>{s.plan}</Text>
          <Text style={{ color: "#94a3b8" }}>${s.price}/month</Text>
        </View>
      ))}
    </ScrollView>
  );
}



