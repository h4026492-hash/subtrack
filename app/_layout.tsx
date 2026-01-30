import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="add" />
      <Stack.Screen name="healthscorecard" />
      <Stack.Screen name="subscription/[id]" />
    </Stack>
  )
}
