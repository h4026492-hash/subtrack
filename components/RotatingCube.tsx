import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RotatingCube() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const rotateX = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View
      style={[
        styles.cube,
        {
          transform: [{ rotateY }, { rotateX }],
        },
      ]}
    >
      <LinearGradient colors={["#6366f1", "#22d3ee", "#a78bfa"]} style={styles.face} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cube: {
    width: 140,
    height: 140,
    borderRadius: 20,
    marginBottom: 40,
  },
  face: {
    flex: 1,
    borderRadius: 20,
  },
});
