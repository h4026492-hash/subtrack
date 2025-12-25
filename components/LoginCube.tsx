import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function LoginCube() {
  const rotate = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 9000,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.cube,
        {
          transform: [{ rotateY: rotation }, { rotateX: rotation }],
        },
      ]}
    >
      <LinearGradient
        colors={['#6D83F2', '#38BDF8', '#A78BFA']}
        style={styles.face}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cube: {
    position: 'absolute',
    top: 160,
    alignSelf: 'center',
    width: 120,
    height: 120,
    opacity: 0.9,
  },
  face: {
    flex: 1,
    borderRadius: 24,
  },
})
