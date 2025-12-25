import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Easing } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const SIZE = 110
const DEPTH = SIZE / 2

export default function RotatingCube() {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = Reanimated.withRepeat(
      withTiming(360, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1
    )
  }, [])

  const cubeStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: `${rotation.value}deg` },
      { rotateY: `${rotation.value}deg` },
    ],
  }))

  return (
    <Reanimated.View style={[styles.cube, cubeStyle]}>
      <Face colors={['#6A5BFF', '#3CE7F6']} style={{ transform: [{ translateZ: DEPTH }] }} />
      <Face colors={['#3CE7F6', '#9B8CFF']} style={{ transform: [{ rotateY: '180deg' }, { translateZ: DEPTH }] }} />
      <Face colors={['#5F6CFF', '#3CE7F6']} style={{ transform: [{ rotateY: '90deg' }, { translateZ: DEPTH }] }} />
      <Face colors={['#9B8CFF', '#6A5BFF']} style={{ transform: [{ rotateY: '-90deg' }, { translateZ: DEPTH }] }} />
      <Face colors={['#6A5BFF', '#3CE7F6']} style={{ transform: [{ rotateX: '90deg' }, { translateZ: DEPTH }] }} />
      <Face colors={['#3CE7F6', '#6A5BFF']} style={{ transform: [{ rotateX: '-90deg' }, { translateZ: DEPTH }] }} />
    </Reanimated.View>
  )
}

function Face({ colors, style }: any) {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.face, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  )
}

const styles = StyleSheet.create({
  cube: {
    width: SIZE,
    height: SIZE,
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 32,
  },
  face: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: 16,
    backfaceVisibility: 'hidden',
  },
})
