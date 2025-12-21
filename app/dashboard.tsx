import { View, Text, StyleSheet } from "react-native";

export default function Dashboard() {
  console.log("DASHBOARD SCREEN RENDERED");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Loaded</Text>
      <Text style={styles.subtitle}>
        If you see this, routing + rendering works
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 16,
  },

});



