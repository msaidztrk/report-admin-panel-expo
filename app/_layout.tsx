import React, { useEffect } from "react";
import { router, Slot } from "expo-router";
import useAuthStore from './store/authStore';
// import { AuthProvider } from "../AuthContext";
import "../global.css";
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { NavigationContainer } from '@react-navigation/native'; 
import Sidebar from "./components/Sidebar";
import CustomHeader from "./components/CustomHeader ";
import Toast from "react-native-toast-message"; 

const Drawer = createDrawerNavigator();
import useTokenCheck from '../app/hooks/useTokenCheck';  

export default function RootLayout() {

  const isAuthenticated = useAuthStore((state: { isAuthenticated: any; }) => state.isAuthenticated);
  useTokenCheck();  
  console.log('page rerenderd');

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


    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
    <Drawer.Screen
      name="Main"
      component={Slot}
      options={{
        // headerShown: true,
        header: () => <CustomHeader />, // Use the custom header
      }}
    />
  </Drawer.Navigator>
  
  );
}
