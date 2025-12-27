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
      withTiming(360, { duration: 12000 }),
      -1,
      false
    )
  }, [])

  const cubeStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotate.value}deg` },
      { rotateX: `${rotate.value * 0.8}deg` },
    ],
  }))

  return (
    <View style={styles.scene} pointerEvents="none">
      <Animated.View style={[styles.cube, cubeStyle]}>

        {/* FRONT */}
        <Face source={require('../assets/logos/netflix.png')} style={{ transform: [{ translateX: HALF }] }} />

        {/* RIGHT */}
        <Face source={require('../assets/logos/prime.png')} style={{ transform: [{ rotateY: '90deg' }, { translateX: HALF }] }} />

        {/* BACK */}
        <Face source={require('../assets/logos/hulu.png')} style={{ transform: [{ rotateY: '180deg' }, { translateX: HALF }] }} />

        {/* LEFT */}
        <Face source={require('../assets/logos/appletv.png')} style={{ transform: [{ rotateY: '-90deg' }, { translateX: HALF }] }} />

        {/* TOP */}
        <Face source={require('../assets/logos/paramount.png')} style={{ transform: [{ rotateX: '-90deg' }, { translateY: HALF }] }} />

        {/* BOTTOM */}
        <Face source={require('../assets/logos/disney.png')} style={{ transform: [{ rotateX: '90deg' }, { translateY: HALF }] }} />

      </Animated.View>
    </View>
  )
}

function Face({ source, style }: any) {
  return (
    <View style={[styles.face, style]}>
      <Image source={source} style={styles.logo} resizeMode="contain" />
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
    borderRadius: 22,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  logo: {
    width: 60,
    height: 60,
  },
})
