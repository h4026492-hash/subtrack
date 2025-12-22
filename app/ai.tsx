import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getDashboard } from "../src/api/dashboardApi";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDashboard().then(setData);
  }, []);

  if (!data) {
    return <Text style={{ padding: 20 }}>Loading…</Text>;
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
        <Text style={{ color: "white", fontSize: 28 }}>${data.totalMonthly}</Text>
      </View>

      {data.subscriptions.map((s: any) => (
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

