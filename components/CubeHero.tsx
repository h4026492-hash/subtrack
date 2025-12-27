import { View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'

const FACES = [
  { name: 'Netflix', colors: ['#E50914', '#B20710'] },
  { name: 'Prime', colors: ['#00A8E1', '#0073B1'] },
  { name: 'Hulu', colors: ['#1CE783', '#0FA958'] },
  { name: 'Apple TV', colors: ['#FFFFFF', '#A3A3A3'] },
  { name: 'Paramount', colors: ['#0053A0', '#002B5C'] },
  { name: 'Subtrack', colors: ['#6366F1', '#38BDF8'] },
]

export function CubeHero() {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 12000 }),
      -1,
      false
    )
  }, [])

  return (
    <View style={styles.container}>
      {FACES.map((face, index) => {
        const style = useAnimatedStyle(() => {
          const faceAngle = index * 60
          const diff = Math.abs((rotation.value % 360) - faceAngle)

          const opacity = interpolate(diff, [0, 60, 120], [1, 0.4, 0])

          const scale = interpolate(diff, [0, 60], [1, 0.85])

          return {
            opacity,
            transform: [{ scale }],
          }
        })

        return (
          <Animated.View key={face.name} style={[styles.face, style]}>
            <LinearGradient colors={face.colors as any} style={styles.gradient} />
          </Animated.View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  face: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 28,
  },
  gradient: {
    flex: 1,
    borderRadius: 28,
  },
})
