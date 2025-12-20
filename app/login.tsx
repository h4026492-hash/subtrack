import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { Colors } from '../src/theme/colors';
import { Spacing } from '../src/theme/spacing';
import apiClient from '../src/api/apiClient';
import { setToken } from '../src/auth/token';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = async () => {
    console.log('LOGIN PRESSED', { email });
    setError(null);
    setLoading(true);
    try {
      const res = await apiClient.post('/login', { email });
      const token = res.data?.token;
      if (!token) throw new Error('No token returned');
      await setToken(token);
      router.replace('/dashboard');
    } catch (err: any) {
      // Provide clearer error message including HTTP status and server body when available
      if (err?.response) {
        const status = err.response.status;
        const data = JSON.stringify(err.response.data);
        console.error('Login error', status, err.response.data);
        setError(`Server: ${status} ${data}`);
      } else {
        console.error('Login error', err);
        setError(err?.message ?? 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: Spacing.lg, backgroundColor: Colors.background }}>
      <Text style={{ fontSize: 28, marginBottom: Spacing.lg }}>Welcome to Subtrack</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ backgroundColor: Colors.card, padding: Spacing.md, borderRadius: 10, marginBottom: Spacing.lg }}
      />

      {error ? <Text style={{ color: '#c44', marginBottom: Spacing.sm }}>{error}</Text> : null}

      <Pressable onPress={onLogin} style={{ backgroundColor: Colors.primary, padding: Spacing.md, borderRadius: 12 }} disabled={loading || email.trim().length === 0}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>}
      </Pressable>
    </View>
  );
}
