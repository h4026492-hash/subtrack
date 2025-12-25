import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Easing } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const SIZE = 120

export default function RotatingCube() {
  const rotate = useSharedValue(0)

  useEffect(() => {
    rotate.value = Reanimated.withRepeat(
      withTiming(360, {
        duration: 9000,
        easing: Easing.linear,
      }),
      -1
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: `${rotate.value}deg` },
      { rotateY: `${rotate.value}deg` },
    ],
  }))

  return (
    <Reanimated.View style={[styles.container, animatedStyle]}>
      <Face colors={['#6A5BFF', '#3CE7F6']} />
      <Face colors={['#3CE7F6', '#9B8CFF']} style={styles.faceBack} />
      <Face colors={['#5F6CFF', '#3CE7F6']} style={styles.faceLeft} />
      <Face colors={['#9B8CFF', '#6A5BFF']} style={styles.faceRight} />
      <Face colors={['#6A5BFF', '#3CE7F6']} style={styles.faceTop} />
      <Face colors={['#3CE7F6', '#6A5BFF']} style={styles.faceBottom} />
    </Reanimated.View>
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
    borderRadius: 18,
    opacity: 0.9,
  },

  faceBack: {
    transform: [{ rotateY: '180deg' }],
  },

  faceLeft: {
    transform: [{ rotateY: '-90deg' }],
  },

  faceRight: {
    transform: [{ rotateY: '90deg' }],
  },

  faceTop: {
    transform: [{ rotateX: '90deg' }],
  },

  faceBottom: {
    transform: [{ rotateX: '-90deg' }],
  },
})
