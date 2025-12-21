import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { askAi } from "../src/api/aiApi.js";

export default function AiScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const typingRef = useRef<number | null>(null);

  async function send() {
    const q = input.trim();
    if (!q) return;
    setInput("");
    setMessages((m) => [...m, "You: " + q]);

    // optimistic placeholder while assistant types
    setMessages((m) => [...m, "AI: "]);
    const currentIndex = messages.length + 1;

    try {
      const res = await askAi(q);

      // typing effect: gradually update the last message
      let i = 0;
      const step = () => {
        i += 1;
        const partial = res.slice(0, i);
        setMessages((m) => m.map((item, idx) => (idx === currentIndex ? `AI: ${partial}` : item)));
        if (i < res.length) {
          typingRef.current = setTimeout(step, 20 + Math.random() * 30) as unknown as number;
        }
      };
      step();
    } catch {
      setMessages((m) => m.map((item, idx) => (idx === currentIndex ? `AI: (error)` : item)));
    }
  }

  // cleanup typing timers on unmount
  useEffect(() => {
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1220", padding: 16 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((m, i) => (
          <Text key={i} style={{ color: "#fff", marginBottom: 12 }}>
            {m}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Ask about your subscriptions..."
        placeholderTextColor="#9CA3AF"
        style={{
          backgroundColor: "rgba(255,255,255,0.12)",
          color: "#fff",
          padding: 16,
          borderRadius: 14,
          marginBottom: 10,
        }}
      />

      <Pressable
        onPress={send}
        style={{
          backgroundColor: "#4F8EF7",
          padding: 14,
          borderRadius: 14,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Ask AI</Text>
      </Pressable>
    </View>
  );
}

