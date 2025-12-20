// Screen displaying list of user subscriptions
// Each subscription shown as a clean card

import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
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
          fontSize: 24,
          fontWeight: "600",
          marginBottom: Spacing.md,
        }}
      >
        Your Subscriptions
      </Text>

      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id.toString()}
        keyboardDismissMode="on-drag"
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn.duration(400)}
            style={{
              backgroundColor: Colors.card,
              padding: Spacing.md,
              borderRadius: 18,
              marginBottom: Spacing.sm,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {item.name}
            </Text>

            <Text style={{ color: Colors.textSecondary }}>
              ${item.amount ?? item.price} / month
            </Text>

            <View
              style={{
                marginTop: Spacing.sm,
                backgroundColor: "rgba(10,132,255,0.1)",
                padding: Spacing.sm,
                borderRadius: 10,
              }}
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
