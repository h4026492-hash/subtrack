import { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { getSubscriptions } from "./src/api/subscriptionApi";
import type { Subscription } from "./src/api/types";

export default function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getSubscriptions()
      .then(setSubscriptions)
      .catch((err) => setError(err?.message ?? "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ margin: 40 }} />;

  if (error)
    return (
      <View style={{ padding: 40 }}>
        <Text style={{ color: "#c44" }}>Error: {error}</Text>
      </View>
    );

  return (
    <View style={{ padding: 40 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>My Subscriptions</Text>

      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.plan} - ${item.price}
          </Text>
        )}
      />
    </View>
  );
}

