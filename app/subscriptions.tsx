import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { getSubscriptions } from '../src/api/subscriptionApi';
import type { Subscription } from '../src/api/types';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';
import { getSubscriptionInsight } from '../src/api/aiApi';

export default function SubscriptionsScreen() {
  const focused = useIsFocused();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = () => {
    setLoading(true);
    setError(null);
    getSubscriptions()
      .then(setSubscriptions)
      .catch((e) => setError(e?.message ?? 'Failed to load'))
      .finally(() => setLoading(false));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getSubscriptions();
      setSubscriptions(data);
    } catch (err) {
      // ignore for now
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (focused) fetch();
  }, [focused]);

  if (loading) return <ActivityIndicator style={{ margin: 40 }} />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, padding: Spacing.lg }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: Spacing.md, color: Colors.textPrimary }}>
        Subscriptions
      </Text>

      {error ? (
        <Text style={{ color: '#c44', marginBottom: Spacing.md }}>{`Error: ${error}`}</Text>
      ) : (
        <FlatList
          data={subscriptions}
          keyExtractor={(item) => item.id.toString()}
          keyboardDismissMode="on-drag"
          refreshing={refreshing}
          onRefresh={onRefresh}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
          renderItem={({ item }) => <SubscriptionCard item={item} />}
        />
      )}
    </View>
  );
}

function SubscriptionCard({ item }: { item: Subscription }) {
  const [aiText, setAiText] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    getSubscriptionInsight(item.id)
      .then((t) => mounted && setAiText(t))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [item.id]);

  const nextBilling = item.nextBillingDate ? new Date(item.nextBillingDate).toLocaleDateString() : '—';

  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      layout={Layout.springify()}
      style={{
        backgroundColor: 'rgba(255,255,255,0.06)',
        padding: Spacing.md,
        borderRadius: 18,
        borderColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.textPrimary }}>{item.plan}</Text>
          <Text style={{ color: Colors.textSecondary, marginTop: 4 }}>{`Next: ${nextBilling}`}</Text>
        </View>

        <View style={{ marginLeft: Spacing.md, alignItems: 'flex-end' }}>
          <Text style={{ fontWeight: '700', color: Colors.textPrimary }}>${item.price.toFixed(2)}</Text>
          <Text style={{ color: Colors.textSecondary, marginTop: 4 }}>{item.currency ?? 'USD'}</Text>
        </View>
      </View>

      <View style={{ marginTop: Spacing.sm, backgroundColor: 'rgba(10,132,255,0.06)', padding: Spacing.sm, borderRadius: 10 }}>
        <Text style={{ fontSize: 12 }}>{aiText ? `🤖 ${aiText}` : '🤖 Analyzing...'}</Text>
      </View>

      <View style={{ marginTop: Spacing.sm, flexDirection: 'row', justifyContent: 'flex-end', gap: Spacing.sm }}>
        <Pressable style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
          <Text style={{ color: Colors.primary, fontWeight: '600' }}>Manage</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
