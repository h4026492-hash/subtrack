import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import api from '../lib/api'

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([])

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const res = await api.get('/subscriptions')
      setSubscriptions(res.data || [])
    } catch (e) {
      console.log('DASHBOARD ERROR', e)
    }
  }

  const totalMonthly = subscriptions.reduce(
    (sum, s) => sum + (s.price || 0),
    0
  )

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Subscriptions</Text>
        <Text style={styles.subtitle}>
          {subscriptions.length} active · ${totalMonthly} / month
        </Text>
      </View>

      {/* LIST / EMPTY STATE */}
      {subscriptions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No subscriptions yet</Text>
          <Text style={styles.emptySubtitle}>
            Add your first subscription to start tracking spending.
          </Text>

          <Pressable
            style={styles.emptyButton}
            onPress={() => router.push('/add')}
          >
            <Text style={styles.emptyButtonText}>Add subscription</Text>
          </Pressable>
        </View>
      ) : (
        subscriptions.map((s: any, index: number) => (
          <View key={s.id ?? index} style={styles.item}>
            <Text style={styles.plan}>{s.name ?? 'Untitled'}</Text>
            <Text style={styles.meta}>
              ${s.price} / {s.billingCycle ?? 'month'}
            </Text>
          </View>
        ))
      )}

      {/* FLOATING ADD */}
      <Pressable style={styles.fab} onPress={() => router.push('/add')}>
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#9CA3AF',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardLeft: {
    width: 6,
    backgroundColor: '#4F8CFF',
  },
  cardContent: {
    padding: 18,
  },
  plan: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  meta: {
    marginTop: 4,
    fontSize: 14,
    color: '#9CA3AF',
  },

  emptyState: {
    marginTop: 120,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  item: {
    marginBottom: 12,
    width: '100%',
  },

  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F8CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    fontSize: 30,
    color: '#FFFFFF',
    marginTop: -2,
  },
})




