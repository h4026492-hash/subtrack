import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import LoginCube from '@/components/LoginCube'
import { login } from '../src/api/authApi'
import { setToken } from '../src/auth/token'
import { router } from 'expo-router'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      await setToken(String(token));
      router.replace("/dashboard");
    } catch (e) {
      setError("Invalid email or password");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      {/* HERO */}
      <View style={styles.hero}>
        <LoginCube />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>Subtrack</Text>
      <Text style={styles.subtitle}>Track subscriptions effortlessly</Text>

      {/* FORM */}
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  content: {
    marginTop: 80,
    paddingHorizontal: 24,
  },
  hero: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
    marginBottom: 32,
  },
  form: {
    width: '85%'
  },
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#6D83F2',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#f87171",
    marginBottom: 8,
  },
});
