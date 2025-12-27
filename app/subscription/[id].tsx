import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getSubscriptionById } from "../../src/api/subscriptionApi";

export default function SubscriptionDetail() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSubscriptionById(String(id));
        setSubscription(data);
      } catch (e) {
        console.error("SUBSCRIPTION DETAIL ERROR", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <Text style={{ padding: 20 }}>Failed to load subscription</Text>;
  }

  if (!subscription) {
    return <Text style={{ padding: 20 }}>Subscription not found</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#020617" }}>
      <Text style={{ color: "white", fontSize: 28, fontWeight: "700" }}>
        {subscription.plan}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 6 }}>${subscription.price} / month</Text>

      <View
        style={{
          marginTop: 24,
          padding: 16,
          borderRadius: 16,
          backgroundColor: "rgba(255,255,255,0.08)",
        }}
      >
        <Text style={{ color: "#94a3b8" }}>Billing Cycle</Text>
        <Text style={{ color: "white", marginTop: 4 }}>
          {subscription.billingCycle || "Monthly"}
        </Text>
      </View>

      <View
        style={{
          marginTop: 16,
          padding: 16,
          borderRadius: 16,
          backgroundColor: "rgba(255,255,255,0.08)",
        }}
      >
        <Text style={{ color: "#94a3b8" }}>Category</Text>
        <Text style={{ color: "white", marginTop: 4 }}>
          {subscription.category || "Streaming"}
        </Text>
      </View>
    </ScrollView>
  );
}
