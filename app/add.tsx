// Screen for adding a new subscription
// Simple form with name and monthly amount

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { addSubscription } from '../src/api/subscriptionApi';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';

export default function AddSubscriptionScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);
  const [suggestion, setSuggestion] = useState('');

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

      {name.toLowerCase().includes('netflix') && (
        <View
          style={{
            backgroundColor: 'rgba(10,132,255,0.1)',
            padding: Spacing.sm,
            borderRadius: 10,
            marginBottom: Spacing.md,
          }}
        >
          <Text style={{ fontSize: 12 }}>🤖 AI Suggests: Typical Netflix plan is $15.99/month</Text>
        </View>
      )}

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
        disabled={!name || !amount}
        onPress={async () => {
          await addSubscription({ name, amount: Number(amount) });
          router.back();
        }}
        style={{
          backgroundColor: name && amount ? Colors.primary : Colors.card,
          padding: Spacing.md,
          borderRadius: 14,
        }}
      >
        <Text
          style={{
            color: name && amount ? '#fff' : Colors.textSecondary,
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
          Save Subscription
        </Text>
      </Pressable>
    </View>
  );
}
