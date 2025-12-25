import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function RotatingCube() {
  const rotate = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const rotateY = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ rotateY }],
        },
      ]}
    >
      <LinearGradient
        colors={['#6A5CFF', '#3EC5FF']}
        style={styles.face}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 110,
    marginBottom: 40,
    borderRadius: 24,
    transform: [{ skewY: '-8deg' }],
  },
  face: {
    flex: 1,
    borderRadius: 24,
    shadowColor: '#3EC5FF',
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
})
