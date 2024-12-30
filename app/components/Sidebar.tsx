import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationProp, DrawerActions } from '@react-navigation/native';
import useLogout from '../hooks/useLogout'; // Import the custom hook


const Sidebar = ({ navigation }: DrawerContentComponentProps) => { 
    const handleLogout = useLogout(); // Use the logout hook
    
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} style={styles.closeButton}>
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.menuItem}>Home</Text>
      <Text style={styles.menuItem}>About</Text>
      <Text style={styles.menuItem}>Settings</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    menuItem: {
      fontSize: 18,
      marginVertical: 10,
    },
    logoutButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#ff4444',
      borderRadius: 5,
      alignItems: 'center',
    },
    logoutText: {
      color: '#fff',
      fontSize: 16,
    },
  });
export default Sidebar;