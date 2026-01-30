import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import api from '../lib/api'
import { SERVICES } from '../lib/services'

export default function Dashboard() {
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const res = await api.get('/subscriptions')
      setSubscriptions(res.data ?? [])
    } catch (e) {
      Alert.alert('Could not load subscriptions')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Subscriptions</Text>
      <Text style={styles.subHeader}>
        {subscriptions.length} active · $
        {subscriptions.reduce((a, b) => a + (b.price ?? 0), 0)} / month
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
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
          subscriptions.map((s, index) => (
            <View key={index} style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {SERVICES[s.name?.toLowerCase()]?.logo && (
                  <Image
                    source={SERVICES[s.name.toLowerCase()].logo}
                    style={{ width: 32, height: 32, marginRight: 12 }}
                    resizeMode="contain"
                  />
                )}

                <View>
                  <Text style={styles.plan}>{s.name ?? 'Untitled'}</Text>
                  <Text style={styles.meta}>
                    ${s.price} / {s.billingCycle ?? 'month'}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable style={styles.fab} onPress={() => router.push('/healthscorecard')}>
        <Text style={styles.fabIcon}>HS</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: '#020617',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  subHeader: {
    marginTop: 6,
    color: '#9CA3AF',
    fontSize: 15,
  },

  card: {
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  plan: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  meta: {
    marginTop: 4,
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

  fab: {
    position: 'absolute',
    right: 22,
    bottom: 32,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
  },
})
