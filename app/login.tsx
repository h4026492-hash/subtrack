import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import RotatingLogos from '../components/RotatingLogos'

export default function Login() {
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('test')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (loading) return
    setLoading(true)

    try {
      console.log('LOGIN CLICKED')

      const res = await axios.post('http://localhost:8081/auth/login', {
        email,
        password,
      })

      const token = res.data?.token
      console.log('TOKEN RECEIVED', token)

      if (!token) {
        throw new Error('Token missing')
      }

      await SecureStore.setItemAsync('token', token)

      // 🔥 THIS LINE IS WHAT WAS MISSING / NOT RUNNING
      router.replace('/dashboard')
    } catch (err: any) {
      console.log('LOGIN FAILED', err?.response?.status)
      Alert.alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <RotatingLogos />
          </View>

      <Text style={styles.title}>Subtrack</Text>

          <Text style={styles.quote}>
            Subscriptions shouldn’t surprise you.
          </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        style={[styles.input, { marginBottom: 12 }]}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={[styles.input, { marginBottom: 20 }]}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#2563eb',
          padding: 16,
          alignItems: 'center',
          borderRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>
          {loading ? 'Signing in...' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    color: '#FFFFFF',
    borderColor: '#1E293B',
  },
  hero: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 16,
  },
  quote: {
    marginTop: 6,
    marginBottom: 28,
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.4,
  },
  subQuote: {
    marginTop: 8,
    fontSize: 14,
    color: '#A0A3B1',
  },
})

