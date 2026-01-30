import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'

export default function HealthScorecard() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Scorecard</Text>
      <Text style={styles.subtitle}>Your subscription health summary will appear here.</Text>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back to dashboard</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
    backgroundColor: '#020617',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#fff',
    fontWeight: '600',
  },
})
