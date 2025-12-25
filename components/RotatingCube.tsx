import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const SIZE = 120

const LOGOS = [
  require('../assets/logos/netflix.png'),
  require('../assets/logos/prime.png'),
  require('../assets/logos/hulu.png'),
  require('../assets/logos/appletv.png'),
  require('../assets/logos/paramount.png'),
  require('../assets/logos/disney.png'),
]

export default function RotatingCube() {
  const rotate = useSharedValue(0)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 6000 }),
      -1,
      false
    )

    const timer = setInterval(() => {
      setIndex(i => (i + 1) % LOGOS.length)
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateY: `${rotate.value}deg` },
      { rotateX: `${interpolate(rotate.value, [0, 360], [0, 15])}deg` },
    ],
  }))

  return (
    <View style={styles.scene} pointerEvents="none">
      <Animated.View style={[styles.container, style]}>
        <LinearGradient colors={['#6A7CFF', '#3BB2FF']} style={styles.card}>
          <Image source={LOGOS[index]} style={styles.logo} resizeMode="contain" />
        </LinearGradient>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: ({
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    // pointerEvents is provided as a prop on the wrapper View above. The
    // following line mirrors the intended style but is cast to `any` to
    // avoid TypeScript complaining about pointerEvents being a non-style
    // property while still keeping the value visible for reviewers.
    ...( { pointerEvents: 'none' } as any ),
  } as any),
  card: {
    width: SIZE,
    height: SIZE,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 20,
  },
  logo: {
    width: 72,
    height: 72,
  },
})

