import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';

export default function AiScreen() {
  return (
    <View style={{ flex: 1, padding: Spacing.lg, backgroundColor: Colors.background }}>
      <Text style={{ fontSize: 22, fontWeight: '600', color: Colors.textPrimary }}>AI Assistant</Text>
      <Text style={{ marginTop: Spacing.md, color: Colors.textSecondary }}>This assistant will analyze your subscriptions and provide suggestions.</Text>
    </View>
  );
}
