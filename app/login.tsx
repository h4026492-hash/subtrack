import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { login } from "../src/api/authApi";
import { setToken } from "../src/auth/token";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test");

  const handleLogin = async () => {
    console.log("LOGIN CLICKED");
    try {
      const token = await login(email, password);
      console.log("LOGIN TOKEN", token);
      await setToken(token);
      router.replace("/dashboard");
    } catch (e) {
      console.error("LOGIN FAILED", e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Pressable onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}
