import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { login } from "../src/api/authApi";
import { setToken } from "../src/auth/token";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    console.log("LOGIN CLICKED");
    try {
      const res = await login("test@test.com", "test");
      console.log("LOGIN RESPONSE", res);

      const token = typeof res === "string" ? res : res?.token ?? res?.accessToken ?? null;
      console.log("PARSED TOKEN", token);

      if (!token) {
        console.log("NO TOKEN RECEIVED");
        return;
      }

      await setToken(token);
      console.log("TOKEN STORED");

      try {
        console.log("NAVIGATING TO DASHBOARD");
        router.replace("/dashboard");
        console.log("NAV OK");
      } catch (navErr) {
        console.error("NAV ERROR", navErr);
      }
    } catch (err) {
      console.error("LOGIN FAILED", err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LOGIN</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
 
