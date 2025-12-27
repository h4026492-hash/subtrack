import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import api from '../lib/api'

export default function AddSubscription() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const save = async () => {
    if (!price) return

    try {
      await api.post('/subscriptions', {
        name: name || 'Untitled',
        price: Number(price),
        billingCycle: 'MONTHLY',
      })

      router.replace('/dashboard')
    } catch (e) {
      console.log('ADD SUB ERROR', e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add subscription</Text>

      <TextInput
        placeholder="Netflix"
        placeholderTextColor="#6B7280"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="15"
        placeholderTextColor="#6B7280"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />

      <Pressable style={styles.saveButton} onPress={save}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#020617',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 28,
  },
  input: {
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 24,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
})

