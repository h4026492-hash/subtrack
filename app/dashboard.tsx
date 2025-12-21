import { View, Text } from "react-native";
import React from "react";

export default function Dashboard() {
  React.useEffect(() => {
    console.log("DASHBOARD: mounted");
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>DASHBOARD SCREEN</Text>
    </View>
  );
}



