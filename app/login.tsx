import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import RotatingCube from '../components/RotatingCubeFixed'

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
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <RotatingCube />
      </View>

      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 20 }}>
        Subtrack
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 12, marginBottom: 12 }}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, marginBottom: 20 }}
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

