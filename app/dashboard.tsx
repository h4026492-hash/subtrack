import { View, Text, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { router } from "expo-router";
import { getToken } from "../src/auth/token";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getDashboard } from "../src/api/dashboardApi";
import GlassCard from "../components/GlassCard";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) {
        router.replace("/login");
        return;
      }
      const data = await getDashboard();
      setDashboard(data);
    } catch (e) {
      console.error("DASHBOARD ERROR", e);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#020617", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={{ color: "#94a3b8", marginTop: 12 }}>Loading your subscriptions…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#020617", padding: 16 }}>
        <Text style={{ color: "#f87171", marginBottom: 12 }}>{error}</Text>
        <Pressable onPress={load} style={{ padding: 12, backgroundColor: "#2563eb", borderRadius: 8 }}>
          <Text style={{ color: "white" }}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!dashboard || dashboard.subscriptions.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#020617",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>No subscriptions yet</Text>
        <Text style={{ color: "#94a3b8", marginTop: 8 }}>
          Add your first subscription to get started
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020617" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "700",
            marginTop: 12,
          }}
        >
          Dashboard
        </Text>

        <Text
          style={{
            color: "#94a3b8",
            marginTop: 6,
            marginBottom: 20,
          }}
        >
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

      <GlassCard>
        <Text style={{ color: "#cbd5f5", fontSize: 14 }}>AI Insight</Text>

        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "600",
            marginTop: 8,
          }}
        >
          You could save $10/month
        </Text>

        <Text style={{ color: "#94a3b8", marginTop: 6 }}>
          Spotify is rarely used. Consider cancelling or switching plans.
        </Text>
        <Pressable
          onPress={() => router.push('/ai')}
          style={{ marginTop: 12, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: 'rgba(37,99,235,0.12)', borderRadius: 10, alignSelf: 'flex-start' }}
        >
          <Text style={{ color: '#60a5fa' }}>Use AI to prefill Add form</Text>
        </Pressable>
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

      {dashboard.subscriptions.map((s: any) => {
        const isExpensive = s.price === dashboard.maxPrice;
        return (
          <Pressable
            key={s.id}
            onPress={() => {
              console.log("SUBSCRIPTION ID", s.id);
              router.push(`/subscription/${s.id}`);
            }}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            <GlassCard>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{s.plan}</Text>
              <Text style={{ color: "#94a3b8", marginTop: 4 }}>${s.price} / month</Text>

              <Text style={{ color: "#60a5fa", fontSize: 12, marginTop: 8 }}>View details</Text>

              {isExpensive && (
                <Text style={{ color: "#fbbf24", marginTop: 6, fontSize: 12 }}>
                  Highest monthly cost
                </Text>
              )}
            </GlassCard>
          </Pressable>
        );
      })}
      </ScrollView>
    </SafeAreaView>
  );
}



