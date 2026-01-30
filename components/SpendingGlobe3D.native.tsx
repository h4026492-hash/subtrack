import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SERVICES } from '../lib/services';

type GlobeQuality = 'low' | 'medium' | 'high';

type SpendingGlobe3DProps = {
  message?: string;
  quality?: GlobeQuality;
  onQualityChange?: (quality: GlobeQuality) => void;
  logos?: Array<{ name: string; source: number }>;
};

const SpendingGlobe3D = ({
  message = '3D globe unavailable on this device.',
  quality = 'medium',
  onQualityChange,
  logos,
}: SpendingGlobe3DProps) => {
  const glowOpacity = useRef(new Animated.Value(0.3)).current;
  const lodScale = useRef(new Animated.Value(1)).current;

  const logoItems = useMemo(() => {
    if (logos && logos.length > 0) {
      return logos;
    }

    return Object.values(SERVICES)
      .filter((service) => service.logo)
      .slice(0, 4)
      .map((service) => ({ name: service.name, source: service.logo }));
  }, [logos]);

  const handleQualityChange = (nextQuality: GlobeQuality) => {
    if (onQualityChange) {
      onQualityChange(nextQuality);
    }
  };

  useEffect(() => {
    const targetScale = quality === 'low' ? 0.94 : quality === 'high' ? 1.08 : 1;
    const targetGlow = quality === 'low' ? 0.2 : quality === 'high' ? 0.55 : 0.35;

    Animated.parallel([
      Animated.spring(lodScale, {
        toValue: targetScale,
        useNativeDriver: true,
        friction: 7,
      }),
      Animated.timing(glowOpacity, {
        toValue: targetGlow,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [glowOpacity, lodScale, quality]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Globe</Text>
      <Text style={styles.message}>{message}</Text>
      <Animated.View style={[styles.sphereRow, { transform: [{ scale: lodScale }] }]}>
        {logoItems.map((logo) => (
          <View key={logo.name} style={styles.sphereWrap}>
            <Animated.View style={[styles.sphereGlow, { opacity: glowOpacity }]} />
            <View style={styles.sphere}>
              <Image source={logo.source} style={styles.sphereLogo} resizeMode="contain" />
            </View>
          </View>
        ))}
      </Animated.View>
      <Animated.Text style={[styles.lodText, { transform: [{ scale: lodScale }] }]}>
        Detail level: {quality.toUpperCase()}
      </Animated.Text>
      <View style={styles.qualityRow}>
        {(['low', 'medium', 'high'] as const).map((level) => {
          const isActive = quality === level;

          return (
            <Pressable
              key={level}
              onPress={() => handleQualityChange(level)}
              style={[styles.qualityButton, isActive && styles.qualityActive]}
            >
              <Text style={styles.qualityText}>{level.toUpperCase()}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    color: '#CBD5F5',
    fontSize: 14,
    textAlign: 'center',
  },
  sphereRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  sphereWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  sphereGlow: {
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
    borderRadius: 36,
    height: 72,
    position: 'absolute',
    width: 72,
  },
  sphere: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderColor: 'rgba(148, 163, 184, 0.4)',
    borderRadius: 28,
    borderWidth: 1,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  sphereLogo: {
    height: 32,
    width: 32,
  },
  lodText: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 10,
  },
  qualityRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  qualityButton: {
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qualityText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  qualityActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default SpendingGlobe3D;
