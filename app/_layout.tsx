// app/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import { CountersProvider } from '../components/CountersContext';

export default function Layout() {
  return (
    <CountersProvider>
      <Drawer
        screenOptions={{
          drawerStyle: { backgroundColor: '#1E1E1E', width: 240 }, // sfondo drawer scuro
          drawerActiveTintColor: '#4caf50', // elemento attivo verde
          drawerInactiveTintColor: '#CCCCCC', // testo inattivo grigio chiaro
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#121212' }, // header nero
          headerTintColor: '#FFFFFF', // testo header bianco
        }}
      >
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="sigarette" options={{ title: "Sigarette" }} />
        <Drawer.Screen name="caffe" options={{ title: "Caffè" }} />
      </Drawer>
    </CountersProvider>
  );
}
