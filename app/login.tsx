import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';
import { useState } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <View style={{ flex: 1, padding: Spacing.lg, backgroundColor: Colors.background }}>
      <Text style={{ fontSize: 28, marginBottom: Spacing.lg }}>Welcome to Subtrack</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor: Colors.card, padding: Spacing.md, borderRadius: 10, marginBottom: Spacing.lg }}
      />

      <Pressable onPress={() => router.replace('/dashboard')} style={{ backgroundColor: Colors.primary, padding: Spacing.md, borderRadius: 12 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
      </Pressable>
    </View>
  );
}
