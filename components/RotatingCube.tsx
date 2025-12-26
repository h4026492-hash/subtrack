import React, { useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated'

const SIZE = 120
const HALF = SIZE / 2

export default function RotatingCube() {
  const rotate = useSharedValue(0)

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 8000 }),
      -1,
      false
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1200 },
      { rotateY: `${rotate.value}deg` },
    ],
  }))

  return (
    <View style={styles.scene}>
      <Animated.View style={[styles.cube, animatedStyle]}>
        <Face logo={require('../assets/logos/netflix.png')} style={{ transform: [{ translateZHack: 1 }] }} />
        <Face logo={require('../assets/logos/prime.png')} style={{ transform: [{ rotateY: '90deg' }, { translateX: HALF }] }} />
        <Face logo={require('../assets/logos/hulu.png')} style={{ transform: [{ rotateY: '180deg' }, { translateX: HALF }] }} />
        <Face logo={require('../assets/logos/appletv.png')} style={{ transform: [{ rotateY: '-90deg' }, { translateX: HALF }] }} />
        <Face logo={require('../assets/logos/paramount.png')} style={{ transform: [{ rotateX: '90deg' }, { translateY: -HALF }] }} />
        <Face logo={require('../assets/logos/disney.png')} style={{ transform: [{ rotateX: '-90deg' }, { translateY: HALF }] }} />
      </Animated.View>
    </View>
  )
}

function Face({ logo, style }: any) {
  return (
    <View style={[styles.face, style]}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  scene: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cube: {
    width: SIZE,
    height: SIZE,
    position: 'relative',
  },
  face: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    backgroundColor: '#0B1020',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backfaceVisibility: 'hidden',
  },
  logo: {
    width: 64,
    height: 64,
  },
})


