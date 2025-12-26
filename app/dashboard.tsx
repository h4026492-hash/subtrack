import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([])

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get('/subscriptions')
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

      {/* LIST */}
      <FlatList
        data={subscriptions}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft} />
            <View style={styles.cardContent}>
              <Text style={styles.plan}>
                {item.name || 'Unknown Subscription'}
              </Text>
              <Text style={styles.meta}>
                ${item.price} · {item.billingCycle || 'Monthly'}
              </Text>
            </View>
          </View>
        )}
      />

      {/* FLOATING ADD */}
      <Pressable style={styles.fab}>
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




