import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        onPress={() => {
          console.log("FORCE NAVIGATION");
          router.replace("/dashboard");
        }}
        style={{
          padding: 16,
          backgroundColor: "black",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>GO TO DASHBOARD</Text>
      </Pressable>
    </View>
  );
}
 
