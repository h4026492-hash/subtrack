import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import api from '../lib/api'

export default function AddSubscription() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [saving, setSaving] = useState(false)

  const save = async () => {
    if (saving) return
    setSaving(true)
    try {
      await api.post('/subscriptions', {
        name,
        price: Number(price),
        billingCycle: 'MONTHLY',
      })

      router.replace('/dashboard')
    } catch (e) {
      console.log('SAVE ERROR', e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add subscription</Text>

      <TextInput
        placeholder="Netflix"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="15"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />

      <Pressable style={styles.saveButton} onPress={save}>
        <Text style={styles.saveText}>{saving ? 'Saving…' : 'Save'}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0B1020',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 12,
    color: '#fff',
    marginBottom: 12,
    borderRadius: 8,
  },
  saveButton: {
    marginTop: 12,
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
})

