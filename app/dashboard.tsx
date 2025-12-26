import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import api from '../lib/api'

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/subscriptions')
        // API returns either array or object; normalize to array
        const subs = res.data?.subscriptions ?? res.data ?? []
        setSubscriptions(subs)
      } catch (e) {
        console.log('DASHBOARD ERROR', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Subscriptions</Text>

      {loading ? (
        <Text style={styles.loading}>Loading…</Text>
      ) : (
        <ScrollView>
          {subscriptions.map((s, index) => (
            <View key={s.id ?? index} style={styles.card}>
              <Text style={styles.plan}>{s.name ?? s.plan ?? 'Untitled'}</Text>
              <Text style={styles.meta}>${s.price} / {s.billingCycle ?? 'month'}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
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
    padding: 20,
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
  loading: {
    color: '#9CA3AF',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
})



