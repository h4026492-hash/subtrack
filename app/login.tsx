import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated'
import { router } from 'expo-router'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import RotatingLogos from '../components/RotatingLogos'

export default function Login() {
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('test')
  const [loading, setLoading] = useState(false)

  const quoteOpacity = useSharedValue(0)
  const quoteTranslate = useSharedValue(6)

  const glowScale = useSharedValue(0.95)
  const glowOpacity = useSharedValue(0.35)

  useEffect(() => {
    quoteOpacity.value = withTiming(1, { duration: 600 })
    quoteTranslate.value = withTiming(0, { duration: 600 })

    glowScale.value = withRepeat(
      withTiming(1.05, { duration: 1800 }),
      -1,
      true
    )

    glowOpacity.value = withRepeat(
      withTiming(0.55, { duration: 1800 }),
      -1,
      true
    )
  }, [])

  const quoteStyle = useAnimatedStyle(() => ({
    opacity: quoteOpacity.value,
    transform: [{ translateY: quoteTranslate.value }],
  }))

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }))

  const handleLogin = async () => {
    if (loading) return
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:8081/auth/login', {
        email,
        password,
      })

      const token = res.data?.token

      if (!token) {
        throw new Error('Token missing')
      }

      await SecureStore.setItemAsync('token', token)

      // 🔥 THIS LINE IS WHAT WAS MISSING / NOT RUNNING
      router.replace('/dashboard')
    } catch (err: any) {
      Alert.alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
          <View style={{ marginTop: 40, alignItems: 'center', position: 'relative' }}>
            <Animated.View style={[styles.glow, glowStyle]} />
            <RotatingLogos />
          </View>

      <Text style={styles.title}>Subtrack</Text>

          <Animated.Text style={[styles.quote, quoteStyle]}>
            Subscriptions shouldn’t surprise you.
          </Animated.Text>

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
  glow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#4F7CFF',
    opacity: 0.4,
    shadowColor: '#4F7CFF',
    shadowOpacity: 0.6,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
})
