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
      <Animated.View style={[styles.cube, animatedStyle, { transformStyle: 'preserve-3d' }]}>
        <Face source={require('../assets/logos/netflix.png')} style={{ transform: [{ translateZ: HALF }] }} />

        <Face
          source={require('../assets/logos/prime.png')}
          style={{ transform: [{ rotateY: '90deg' }, { translateZ: HALF }] }}
        />

        <Face
          source={require('../assets/logos/hulu.png')}
          style={{ transform: [{ rotateY: '180deg' }, { translateZ: HALF }] }}
        />

        <Face
          source={require('../assets/logos/appletv.png')}
          style={{ transform: [{ rotateY: '-90deg' }, { translateZ: HALF }] }}
        />

        <Face
          source={require('../assets/logos/paramount.png')}
          style={{ transform: [{ rotateX: '90deg' }, { translateZ: HALF }] }}
        />

        <Face
          source={require('../assets/logos/disney.png')}
          style={{ transform: [{ rotateX: '-90deg' }, { translateZ: HALF }] }}
        />
      </Animated.View>
    </View>
  )
}

function Face({ source, style }: any) {
  return (
    <View
      style={[
        styles.face,
        {
          transform: [
            ...(style?.transform ?? []),
            { translateZ: 0 }, // forces RN to keep 3D context
          ],
        },
      ]}
    >
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


