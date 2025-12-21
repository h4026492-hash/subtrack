import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { fetchSubscriptions } from "../src/api/subscriptionApi";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await fetchSubscriptions();
      setSubscriptions(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.info}>Loading subscriptions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Subscriptions</Text>

      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.plan}>{item.plan}</Text>
            <Text style={styles.price}>${item.price}/month</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    padding: 20,
  },
  center: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  plan: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    color: "#9CA3AF",
    marginTop: 4,
  },
  info: {
    color: "#9CA3AF",
    marginTop: 12,
  },
  error: {
    color: "#EF4444",
    fontSize: 16,
  },
});



