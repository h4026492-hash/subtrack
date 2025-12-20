// Screen for adding a new subscription
// Simple form with name and monthly amount

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';
import { addSubscription } from '../src/api/subscriptionApi';

export default function AddSubscriptionScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);

  const canSave = name.trim().length > 0 && !Number.isNaN(Number(amount)) && Number(amount) > 0 && !saving;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.lg,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: Spacing.lg }}>
        Add Subscription
      </Text>

      {/* Input fields for subscription name and amount */}
      <TextInput
        placeholder="Service name"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: Colors.card,
          padding: Spacing.md,
          borderRadius: 10,
          marginBottom: Spacing.md,
        }}
      />

      <TextInput
        placeholder="Monthly amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{
          backgroundColor: Colors.card,
          padding: Spacing.md,
          borderRadius: 10,
          marginBottom: Spacing.lg,
        }}
      />

      <Pressable
        onPress={async () => {
          if (!canSave) return;
          setSaving(true);
          try {
            await addSubscription({ name: name.trim(), amount: Number(amount) });
            router.back();
          } catch (err) {
            // For now, just console log — we can show a toast later
            console.warn('Failed to save', err);
          } finally {
            setSaving(false);
          }
        }}
        style={{
          backgroundColor: canSave ? Colors.primary : Colors.card,
          padding: Spacing.md,
          borderRadius: 12,
        }}
        disabled={!canSave}
      >
        <Text style={{ color: canSave ? '#fff' : Colors.textSecondary, textAlign: 'center', fontWeight: '600' }}>
          {saving ? 'Saving...' : 'Save'}
        </Text>
      </Pressable>
    </View>
  );
}
