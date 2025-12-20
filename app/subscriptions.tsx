import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
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

  const fetch = () => {
    setLoading(true);
    setError(null);
    getSubscriptions()
      .then(setSubscriptions)
      .catch((e) => setError(e?.message ?? 'Failed to load'))
      .finally(() => setLoading(false));
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

  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={{ backgroundColor: Colors.card, padding: Spacing.md, borderRadius: 18, marginBottom: Spacing.sm }}
    >
      <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.textPrimary }}>{item.name}</Text>

      <Text style={{ color: Colors.textSecondary }}>{`$${item.amount ?? item.price} / month`}</Text>

      <View style={{ marginTop: Spacing.sm, backgroundColor: 'rgba(10,132,255,0.08)', padding: Spacing.sm, borderRadius: 10 }}>
        <Text style={{ fontSize: 12 }}>{aiText ? `🤖 ${aiText}` : '🤖 Analyzing...'}</Text>
      </View>
    </Animated.View>
  );
}
// Screen displaying list of user subscriptions
// Each subscription shown as a clean card

import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { getSubscriptionInsight } from "../src/api/aiApi";
import { useEffect } from "react";
import { Colors } from "../src/theme/colors";
import { Spacing } from "../src/theme/spacing";
import { getSubscriptions } from "../src/api/subscriptionApi";
import { View } from "react-native";

export default function SubscriptionsScreen() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    getSubscriptions()
      .then(setSubscriptions)
      .catch(() => {});
  }, []);

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
          <FlatList
            data={subscriptions}
            keyExtractor={(item) => item.id.toString()}
            keyboardDismissMode="on-drag"
            renderItem={({ item }) => <SubscriptionCard item={item} />}
          />
        </View>
      );
    }

    function SubscriptionCard({ item }: { item: any }) {
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

      return (
        <Animated.View entering={FadeIn.duration(400)}
          style={{
            backgroundColor: Colors.card,
            padding: Spacing.md,
            borderRadius: 18,
            marginBottom: Spacing.sm,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>

          <Text style={{ color: Colors.textSecondary }}>${item.amount ?? item.price} / month</Text>

          <View
            style={{
              marginTop: Spacing.sm,
              backgroundColor: 'rgba(10,132,255,0.1)',
              padding: Spacing.sm,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 12 }}>{aiText ? `🤖 ${aiText}` : '🤖 Analyzing...'}</Text>
          </View>
        </Animated.View>
      );
            >
              <Text style={{ fontSize: 12 }}>
                🤖 AI Suggests: Review this subscription for savings.
              </Text>
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
}
