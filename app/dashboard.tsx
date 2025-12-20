import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  SlideInUp,
  Layout,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1220" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "600",
          color: "#fff",
          marginBottom: 24,
        }}
      >
        Dashboard
      </Text>

      {/* Glass Card – Monthly Spend */}
      <Animated.View
        entering={SlideInUp.duration(500)}
        layout={Layout.springify()}
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#aaa", marginBottom: 8 }}>Monthly Spend</Text>
        <Text style={{ fontSize: 32, color: "#fff", fontWeight: "600" }}>$126.40</Text>

        <Text style={{ color: "#7dd3fc", marginTop: 8 }}>↑ 12% from last month</Text>
      </Animated.View>

      {/* Glass Card – AI Insight */}
      <Animated.View
        entering={SlideInUp.duration(600)}
        layout={Layout.springify()}
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#aaa", marginBottom: 8 }}>AI Insight</Text>

        <Text style={{ color: "#fff", lineHeight: 22 }}>
          You are spending more on entertainment subscriptions. Consider
          cancelling unused services to save approximately $18 per month.
        </Text>
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
    </ScrollView>
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

