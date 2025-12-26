import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0B1020' }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0B1020' },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="add-subscription" />
      </Stack>
    </View>
  )
}
