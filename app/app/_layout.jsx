import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2563eb' },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#eff6ff' }
      }}
    >
      <Stack.Screen name="index" options={{ title: '首页' }} />
      <Stack.Screen name="register" options={{ title: '报名' }} />
      <Stack.Screen name="trial" options={{ title: '试听预约' }} />
      <Stack.Screen name="showcase" options={{ title: '展示' }} />
    </Stack>
  );
}
