import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  SlideInUp,
  Layout,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedScrollHandler,
  useAnimatedProps,
  useDerivedValue,
  runOnJS,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import React from 'react';
import { getSubscriptions } from '../src/api/subscriptionApi';
import { getAiInsight } from '../src/api/aiApi';
import type { Subscription } from '../src/api/types';

export default function DashboardScreen() {
  const router = useRouter();
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // animated total value
  const totalShared = useSharedValue(0);
  const [displayTotal, setDisplayTotal] = React.useState(0);
  useDerivedValue(() => {
    // push numeric updates back to React state for display
    runOnJS(setDisplayTotal)(Number(totalShared.value.toFixed(2)));
    return totalShared.value;
  });
  // Fetch real data and animate total + AI insight
  const [subscriptions, setSubscriptions] = React.useState<Subscription[] | null>(null);
  const [aiInsight, setAiInsight] = React.useState<string>('');
  const [aiKey, setAiKey] = React.useState<string>('ai-init');

  React.useEffect(() => {
    let mounted = true;

    getSubscriptions()
      .then((data) => {
        if (!mounted) return;
        setSubscriptions(data);
        const total = data.reduce((s, it) => s + (it.price ?? 0), 0);
        totalShared.value = withTiming(total, { duration: 800 });
      })
      .catch(() => {});

    getAiInsight()
      .then((ins) => {
        if (!mounted) return;
        setAiInsight(ins);
        setAiKey(ins.slice(0, 20));
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      scrollEventThrottle={16}
      style={{ flex: 1, backgroundColor: "#0B1220" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Header */}
      <Animated.Text
        style={[
          {
            fontSize: 28,
            fontWeight: '600',
            color: '#fff',
            marginBottom: 24,
          },
          useAnimatedStyle(() => {
            const t = Math.min(scrollY.value / 200, 1);
            return {
              transform: [{ translateY: -t * 8 }, { scale: 1 - t * 0.04 }],
              opacity: 1 - t * 0.15,
            };
          }),
        ]}
      >
        Dashboard
      </Animated.Text>

      {/* Glass Card – Monthly Spend */}
      <Animated.View
        entering={SlideInUp.duration(500)}
        layout={Layout.springify()}
        style={[
          {
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
          },
          useAnimatedStyle(() => ({ transform: [{ translateY: scrollY.value * 0.12 }] })),
        ]}
      >
        <Text style={{ color: "#aaa", marginBottom: 8 }}>Monthly Spend</Text>
        <Text style={{ fontSize: 32, color: "#fff", fontWeight: "600" }}>${displayTotal.toFixed(2)}</Text>

        <Text style={{ color: "#7dd3fc", marginTop: 8 }}>↑ 12% from last month</Text>
      </Animated.View>

      {/* Glass Card – AI Insight */}
      <Animated.View
        entering={SlideInUp.duration(600)}
        layout={Layout.springify()}
        style={[
          {
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
          },
          useAnimatedStyle(() => ({ transform: [{ translateY: scrollY.value * 0.06 }] })),
        ]}
      >
        <Text style={{ color: "#aaa", marginBottom: 8 }}>AI Insight</Text>

        <Animated.View entering={FadeIn.duration(350)} key={aiKey}>
          <Text style={{ color: '#fff', lineHeight: 22 }}>{aiInsight || 'Analyzing your subscriptions...'}</Text>
        </Animated.View>
      </Animated.View>

      {/* Actions */}
      <View style={{ gap: 14 }}>
        <AnimatedButton
          onPress={() => router.push("/subscriptions")}
          style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: 16, borderRadius: 16 }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>View Subscriptions</Text>
        </AnimatedButton>

        <AnimatedButton
          onPress={() => router.push("/add")}
          style={{ backgroundColor: "#4F8EF7", padding: 16, borderRadius: 16 }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Add Subscription</Text>
        </AnimatedButton>

        <AnimatedButton
          onPress={() => router.push("/ai")}
          style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: 16, borderRadius: 16 }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Ask AI Assistant</Text>
        </AnimatedButton>
      </View>
    </Animated.ScrollView>
  );
}

function AnimatedButton({ onPress, children, style }: { onPress: () => void; children: React.ReactNode; style?: any }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.97))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
}



