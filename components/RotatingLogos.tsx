import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated'

const LOGOS = [
  require('../assets/logos/netflix.png'),
  require('../assets/logos/prime.png'),
  require('../assets/logos/hulu.png'),
  require('../assets/logos/appletv.png'),
  require('../assets/logos/paramount.png'),
  require('../assets/logos/disney.png'),
]

export default function RotatingLogos() {
  const rotate = useSharedValue(0)

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 8000 }),
      -1,
      false
    )
  }, [])

  return (
    <View style={styles.container}>
      {LOGOS.map((logo, i) => {
        const angle = (360 / LOGOS.length) * i

        const style = useAnimatedStyle(() => ({
          transform: [
            { perspective: 800 },
            { rotateY: `${rotate.value + angle}deg` },
            { translateX: 90 },
          ],
          opacity: Math.cos(((rotate.value + angle) * Math.PI) / 180) > 0 ? 1 : 0.3,
        }))

        return (
          <Animated.View key={i} style={[styles.logoWrap, style]}>
            <Image source={logo} style={styles.logo} />
          </Animated.View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    position: 'absolute',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
})
