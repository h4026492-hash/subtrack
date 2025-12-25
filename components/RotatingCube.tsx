import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const SIZE = 120

export default function RotatingCube() {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = Animated.withRepeat(
      withTiming(360, { duration: 9000 }),
      -1,
      false
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: `${rotation.value}deg` },
      { rotateY: `${rotation.value}deg` },
    ],
  }))

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Face colors={['#6A5BFF', '#3CE7F6']} />
      <Face colors={['#3CE7F6', '#9B8CFF']} style={styles.back} />
      <Face colors={['#5F6CFF', '#3CE7F6']} style={styles.left} />
      <Face colors={['#9B8CFF', '#6A5BFF']} style={styles.right} />
      <Face colors={['#6A5BFF', '#3CE7F6']} style={styles.top} />
      <Face colors={['#3CE7F6', '#6A5BFF']} style={styles.bottom} />
    </Animated.View>
  )
}

function Face({ colors, style }: any) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.face, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    marginBottom: 36,
  },

  face: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: 20,
    opacity: 0.9,
  },

  back: {
    transform: [{ rotateY: '180deg' }],
  },

  left: {
    transform: [{ rotateY: '-90deg' }],
  },

  right: {
    transform: [{ rotateY: '90deg' }],
  },

  top: {
    transform: [{ rotateX: '90deg' }],
  },

  bottom: {
    transform: [{ rotateX: '-90deg' }],
  },
})

