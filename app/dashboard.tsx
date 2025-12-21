import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getSubscriptions } from "../src/api/subscriptionApi.js";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    getSubscriptions().then(setSubscriptions);
  }, []);

  const total = subscriptions.reduce((sum: number, s: any) => sum + Number(s.price || 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Subscriptions</Text>
      <Text style={styles.total}>Total: ${total}/month</Text>
      <Text style={styles.insight}>{`You spend $${total} every month on subscriptions`}</Text>

      <FlatList
        data={subscriptions}
        keyExtractor={(item: any) => item.id.toString()}
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
    backgroundColor: "#0f172a",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  plan: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 6,
  },
  total: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
  insight: {
    color: "#38bdf8",
    fontSize: 14,
    marginBottom: 16,
  },
});



