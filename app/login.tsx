import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>LOGIN TEST SCREEN</Text>

      <Pressable
        onPress={() => {
          console.log("LOGIN CLICKED");
          router.replace("/dashboard");
        }}
        style={{ backgroundColor: "#4F8EF7", padding: 16, borderRadius: 12 }}
      >
        <Text style={{ color: "#fff" }}>Go to Dashboard</Text>
      </Pressable>
    </View>
  );
}
