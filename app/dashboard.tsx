import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { getAiInsight, getAiPrediction } from '../src/api/aiApi';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { deleteToken } from '../src/auth/token';
import { getSubscriptions } from '../src/api/subscriptionApi';
import type { Subscription } from '../src/api/types';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';

export default function DashboardScreen() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('');
  const [monthly, setMonthly] = useState<number[] | null>(null);

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

    // fetch AI insight (non-blocking)
    getAiInsight()
      .then((insight) => mounted && setAiInsight(insight))
      .catch(() => {});

    // prediction
    getAiPrediction().then((p) => mounted && setPrediction(p)).catch(() => {});
    // fetch monthly stats
    import('../src/api/aiApi').then(({ getMonthlyStats }) => {
      getMonthlyStats().then((d) => mounted && setMonthly(d)).catch(() => {});
    });

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
      <LinearGradient
        colors={["#0A84FF", "#5AC8FA"]}
        style={{
          padding: Spacing.xl,
          borderRadius: 20,
          marginBottom: Spacing.lg,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: '700' }}>${total.toFixed(2)}</Text>
        <Text style={{ color: '#E5F2FF', marginTop: 4 }}>Monthly Spend</Text>
      </LinearGradient>

      <Animated.View entering={FadeIn.duration(400)}
        style={{
          backgroundColor: 'rgba(255,255,255,0.75)',
          padding: Spacing.md,
          borderRadius: 16,
          marginBottom: Spacing.lg,
        }}
      >
        <Text style={{ fontWeight: '600', marginBottom: 4 }}>🤖 AI Insight</Text>
        <Text style={{ color: Colors.textSecondary }}>{aiInsight || 'Analyzing your subscriptions...'}</Text>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(400)}
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
      </Animated.View>

      <LineChart
        data={{
          labels: ['-3m', '-2m', '-1m', 'Now'],
          datasets: [{ data: monthly ?? [0, 0, 0, 0] }],
        }}
        width={Dimensions.get('window').width - 40}
        height={180}
        chartConfig={{
          backgroundColor: Colors.background,
          backgroundGradientFrom: Colors.background,
          backgroundGradientTo: Colors.background,
          color: () => Colors.primary,
        }}
        style={{ marginTop: Spacing.lg, borderRadius: 16 }}
      />

      <Text style={{ marginTop: Spacing.md, color: Colors.textSecondary }}>{`🤖 AI Prediction: ${prediction || 'Analyzing...'}`}</Text>

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

      <Pressable
        onPress={async () => {
          await deleteToken();
          router.replace('/login');
        }}
        style={{
          marginTop: Spacing.md,
          padding: Spacing.md,
          borderRadius: 12,
        }}
      >
        <Text style={{ textAlign: 'center', color: Colors.textSecondary }}>Logout</Text>
      </Pressable>
    </View>
  );
}
