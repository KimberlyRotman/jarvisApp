import DrawerContent from '@src/shared/components/DrawerContent';
import { AppColors } from '@src/shared/utils/colors';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function MainLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: AppColors.backgroundSecondary,
            width: 280,
          },
          swipeEnabled: true,
        }}
      >
        <Drawer.Screen name="chat" options={{ title: 'Chat' }} />
        <Drawer.Screen name="tasks" options={{ title: 'Tasks' }} />
        <Drawer.Screen name="calendar" options={{ title: 'Calendário' }} />
        <Drawer.Screen name="list/[listId]" options={{ title: 'Lista' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
