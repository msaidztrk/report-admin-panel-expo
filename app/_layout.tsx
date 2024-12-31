import React, { useEffect } from "react";
import { router, Slot } from "expo-router";
import useAuthStore from './store/authStore';
import "../global.css";
import { Drawer } from "expo-router/drawer";
import Sidebar from "./components/Sidebar";

import Toast from "react-native-toast-message";
import useTokenCheck from '../app/hooks/useTokenCheck';
import CustomHeader from "./components/CustomHeader ";

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useTokenCheck();
  console.log('page rerendered');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Toast />
        <Slot />
      </>
    );
  }

  return ( 


    
    <Drawer
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        header: () => <CustomHeader />,
      }}
    >
      <Drawer.Screen
        name="(tabs)" // This matches the `(tabs)` directory
        options={{
          // title: "Home",
        }}
      />
    </Drawer>
  );
}