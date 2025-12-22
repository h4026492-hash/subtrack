import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { login } from "../src/api/authApi";
import { setToken } from "../src/auth/token";

export default function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test");

  const onLogin = async () => {
    console.log("LOGIN CLICKED");
    const res = await login(email, password);
    console.log("LOGIN RESPONSE", res);
    // backend may return token as string or { token }
    const token = typeof res === "string" ? res : res?.token ?? null;
    await setToken(token);
    router.replace("/dashboard");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />

      <Text>Password</Text>
      <TextInput value={password} secureTextEntry onChangeText={setPassword} />

      <Pressable onPress={onLogin} style={{ marginTop: 20 }}>
        <Text>LOGIN</Text>
      </Pressable>
    </View>
  );
}
 
