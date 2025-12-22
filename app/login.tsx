import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { login } from "../src/api/authApi";
import { setToken } from "../src/auth/token";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await login(email, password);
      // backend may return a token string or an object { token }
      const token = typeof res === 'string' ? res : res?.token ?? null;
      if (!token) throw new Error('No token returned');
      await setToken(token);
      router.replace("/dashboard");
    } catch (e) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Signing in..." : "Login"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0B1220' },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#9CA3AF', marginBottom: 16 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  button: { backgroundColor: '#4F8EF7', padding: 14, borderRadius: 12, marginTop: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
 
