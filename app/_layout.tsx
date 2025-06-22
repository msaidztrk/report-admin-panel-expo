import React, { useEffect } from "react";
import { router, Slot, useFocusEffect, usePathname } from "expo-router";
import useAuthStore from './store/authStore';
import "../global.css";
import { Drawer } from "expo-router/drawer";
import Sidebar from "./components/Sidebar";

import Toast from "react-native-toast-message";
import useTokenCheck from '../app/hooks/useTokenCheck';
import useServerHealth from './hooks/useServerHealth';
import CustomHeader from "./components/CustomHeader ";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RootLayout() {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { setToken, setUser } = useAuthStore();

  useTokenCheck();
  useServerHealth(); // Check server health on app startup
  console.log('page rerendered');

  const pathname = usePathname(); // Get the current pathname
  useEffect(() => {
    console.log('Current Route:', pathname);
  }, [pathname]);

  const navigateToRoute = (route: any) => {
    router.replace(route);
  };

  useEffect(() => {
    const loadUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      if (token && userString) {
        setToken(token);
        setUser(JSON.parse(userString));
        navigateToRoute("/screens");
      }else{
        navigateToRoute("/login");
      }
    };

    loadUserData();
  }, [setToken, setUser]);
 
  
  // useEffect(() => {
  //   if (!isAuthenticated) {
     
  //   } else {
      
  //   }
  // }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Toast />
        <Slot />
      </>
    );
  }

  return (

    <>

    <Drawer
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        header: () => <CustomHeader />,
      }}
    >
      <Drawer.Screen
        name="screens" // This matches the `(tabs)` directory
        options={{
          // title: "Home",
        }}
      />
    </Drawer>
    <Toast />
    </>
  );
}