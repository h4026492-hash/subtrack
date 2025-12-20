// Screen displaying list of user subscriptions
// Each subscription shown as a clean card

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Platform } from 'react-native';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';
import { getSubscriptions } from '../src/api/subscriptionApi';
import type { Subscription } from '../src/api/types';
import { useIsFocused } from '@react-navigation/native';

export default function SubscriptionsScreen() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const focused = useIsFocused();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getSubscriptions()
      .then((data) => mounted && setSubscriptions(data))
      .catch(() => {})
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [focused]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.lg,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: Spacing.md, color: Colors.textPrimary }}>
        Subscriptions
      </Text>

      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id.toString()}
        keyboardDismissMode="on-drag"
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: Colors.card,
              padding: Spacing.md,
              borderRadius: 14,
              marginBottom: Spacing.sm,
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                },
                android: { elevation: 1 },
              }),
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
            <Text style={{ color: Colors.textSecondary }}>${item.price} / month</Text>
          </View>
        )}
      />
    </View>
  );
}
