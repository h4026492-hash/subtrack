import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../lib/api'

export default function Dashboard() {
  const [error, setError] = useState(false)
  const [subscriptions, setSubscriptions] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/subscriptions')
        console.log('SUBSCRIPTIONS', res.data)
        // support both res.data.subscriptions and res.data itself
        const subs = res.data?.subscriptions ?? res.data ?? []
        setSubscriptions(subs)
      } catch (e) {
        console.log('DASHBOARD ERROR', e)
        setError(true)
      }
    }

    load()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {error && <Text style={styles.errorText}>403 Unauthorized</Text>}

      {subscriptions.length === 0 && !error ? (
        <Text style={styles.empty}>No subscriptions yet</Text>
      ) : (
        <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.list}>
          {subscriptions.map((s: any) => (
            <View key={s.id ?? JSON.stringify(s)} style={styles.item}>
              <Text style={styles.plan}>{s.plan ?? s.name ?? 'Untitled'}</Text>
              <Text style={styles.meta}>${s.price} / {s.billingCycle ?? 'month'}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  empty: {
    color: '#94a3b8',
    marginTop: 40,
  },
  list: {
    paddingBottom: 40,
  },
  item: {
    marginBottom: 12,
    width: '100%',
  },
  plan: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    color: '#C7C7CC',
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
})



