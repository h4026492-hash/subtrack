// Screen displaying list of user subscriptions
// Each subscription shown as a clean card

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';

export default function SubscriptionsScreen() {
  const subscriptions = [
    { id: '1', name: 'Netflix', amount: 15 },
    { id: '2', name: 'Spotify', amount: 10 },
    { id: '3', name: 'Apple iCloud', amount: 3 },
  ];

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
          fontSize: 24,
          fontWeight: '600',
          marginBottom: Spacing.md,
          color: Colors.textPrimary,
        }}
      >
        Subscriptions
      </Text>

      {/* Render a list of subscription cards */}
      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: Colors.card,
              padding: Spacing.md,
              borderRadius: 12,
              marginBottom: Spacing.sm,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
            <Text style={{ color: Colors.textSecondary }}>${item.amount} / month</Text>
          </View>
        )}
      />
    </View>
  );
}
