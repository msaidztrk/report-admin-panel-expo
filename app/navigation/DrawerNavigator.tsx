import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Home from '../(tabs)/index'; // Adjust the import path as needed
// import About from '../(tabs)/about'; // Adjust the import path as needed
// import LogOfUsage from '../(tabs)/logOfUsage'; // Adjust the import path as needed
import Sidebar from '../components/Sidebar'; // Adjust the import path as needed

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    // <Drawer.Navigator
    //   drawerContent={(props) => <Sidebar {...props} />}
    //   screenOptions={{
    //     headerShown: false, // Hide the header for all screens
    //   }}
    // >
    //   {/* <Drawer.Screen name="Home" component={Home} /> */}
    //   {/* <Drawer.Screen name="About" component={About} /> */}
    //   {/* <Drawer.Screen name="LogOfUsage" component={LogOfUsage} /> */}
    // {/* </Drawer.Navigator> */} 
    <></>
  );
};

export default DrawerNavigator;