import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';
import { getSubscriptions } from '../src/api/subscriptionApi';
import type { Subscription } from '../src/api/types';

export default function DashboardScreen() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getSubscriptions()
      .then((data) => {
        if (mounted) setSubscriptions(data);
      })
      .catch((err) => {
        if (mounted) setError(err?.message ?? 'Failed to load');
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const total = useMemo(() => {
    if (!subscriptions) return 0;
    return subscriptions.reduce((s, it) => s + (it.price ?? 0), 0);
  }, [subscriptions]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );

  if (error)
    return (
      <View style={{ flex: 1, padding: Spacing.lg }}>
        <Text style={{ color: '#c44' }}>Error: {error}</Text>
      </View>
    );

  const activeCount = subscriptions?.length ?? 0;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.lg,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: '600',
          color: Colors.textPrimary,
          marginBottom: Spacing.md,
        }}
      >
        This Month
      </Text>

      <Text
        style={{
          fontSize: 36,
          fontWeight: '700',
          color: Colors.primary,
          marginBottom: Spacing.lg,
        }}
      >
        ${total.toFixed(2)}
      </Text>

      <View
        style={{
          backgroundColor: Colors.card,
          padding: Spacing.md,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: Colors.textSecondary }}>Active Subscriptions</Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: Colors.textPrimary,
          }}
        >
          {activeCount}
        </Text>
      </View>

      <Pressable
        onPress={() => router.push('/subscriptions')}
        style={{
          marginTop: Spacing.lg,
          backgroundColor: Colors.primary,
          padding: Spacing.md,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>View Subscriptions</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/add')}
        style={{
          marginTop: Spacing.md,
          backgroundColor: Colors.card,
          padding: Spacing.md,
          borderRadius: 12,
        }}
      >
        <Text style={{ textAlign: 'center', fontWeight: '600' }}>Add Subscription</Text>
      </Pressable>
    </View>
  );
}

