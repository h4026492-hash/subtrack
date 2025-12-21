import { Text, ScrollView, Animated, Pressable } from "react-native";
import { useEffect, useRef, useState } from "react";
import { getSubscriptionInsight, getSubscriptions } from "../src/api/subscriptionApi.js";
import { useRouter } from "expo-router";

export default function Subscriptions() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // animate once on mount — fadeAnim & slideAnim are refs and stable
  useEffect(() => {
    getSubscriptions().then(setSubscriptions);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1220" }}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={{ fontSize: 28, color: "#fff", marginBottom: 20 }}>
        Subscriptions
      </Text>

      {subscriptions.length === 0 && (
        <Text style={{ color: "#9CA3AF", textAlign: "center", marginTop: 40 }}>
          No subscriptions yet.
        </Text>
      )}

      {subscriptions.map((item) => (
        <SubscriptionCard key={item.id} item={item} />
      ))}

      <Pressable
        onPress={() => router.push("/add")}
        style={({ pressed }) => ({
          backgroundColor: "#4F8EF7",
          padding: 16,
          borderRadius: 16,
          marginTop: 12,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        })}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Add Subscription
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function SubscriptionCard({ item }: { item: any }) {
  const [insight, setInsight] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;

  // animate in per-card — fadeAnim & slideAnim are refs and stable
  useEffect(() => {
    let mounted = true;
    // animate in
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 360, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 360, useNativeDriver: true }),
    ]).start();

    getSubscriptionInsight(item.id)
      .then((t) => mounted && setInsight(t))
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [item.id, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={{
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <Text style={{ fontSize: 18, color: "#fff", marginBottom: 6 }}>{item.name}</Text>

      <Text style={{ color: "#9CA3AF", marginBottom: 6 }}>${item.amount} / month</Text>

      <Text style={{ color: "#7DD3FC", fontSize: 12 }}>Category: {item.category}</Text>

      <Text style={{ color: "#A5B4FC", fontSize: 12, marginTop: 6 }}>{insight ? `🤖 ${insight}` : '🤖 Analyzing usage…'}</Text>
    </Animated.View>
  );
}

