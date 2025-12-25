import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const SIZE = 120

export default function RotatingCube() {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 9000 }),
      -1,
      false
    )
  }, [])

  const cubeStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${rotation.value}deg` },
      { rotateX: `${rotation.value * 0.7}deg` },
    ],
  }))

  return (
    <Animated.View style={[styles.cube, cubeStyle]}>
      <LinearGradient
        colors={['#6a5cff', '#3bdcff']}
        style={styles.face}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cube: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    width: SIZE,
    height: SIZE,
    borderRadius: 24,
  },
})
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const SIZE = 120

export default function RotatingCube() {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 9000 }),
      -1,
      false
    )
  }, [])

  const cubeStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${rotation.value}deg` },
      { rotateX: `${rotation.value * 0.7}deg` },
    ],
  }))

  return (
    <Animated.View style={[styles.cube, cubeStyle]}>
      <LinearGradient
        colors={['#6a5cff', '#3bdcff']}
        style={styles.face}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cube: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    width: SIZE,
    height: SIZE,
    borderRadius: 24,
  },
})
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const SIZE = 120

export default function RotatingCube() {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 9000 }),
      -1,
      false
    )
  }, [])

  const cubeStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${rotation.value}deg` },
      { rotateX: `${rotation.value * 0.7}deg` },
    ],
  }))

  return (
    <Animated.View style={[styles.cube, cubeStyle]}>
      <Face colors={['#6a5cff', '#3bdcff']} />
    </Animated.View>
  )
}

function Face({ colors }: { colors: string[] }) {
  return (
    <LinearGradient
      colors={colors}
      style={styles.face}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  )
}

const styles = StyleSheet.create({
  cube: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    width: SIZE,
    height: SIZE,
    borderRadius: 24,
  },
})
    height: SIZE,

    borderRadius: 20,
