import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import useLogout from '../hooks/useLogout'; // Import the custom hook
import { Link } from 'expo-router';

const Sidebar = ({ navigation }: DrawerContentComponentProps) => {
    const handleLogout = useLogout(); // Use the logout hook

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('index')} style={styles.menuItem}>
                <Link href="/(tabs)">İndex</Link>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('about', { screen: 'about' })} style={styles.menuItem}>
                <Link href="/about">About</Link>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('logOfUsage', { screen: 'logOfUsage' })} style={styles.menuItem}>
                <Link href="/logOfUsage">logOfUsage</Link>
            </TouchableOpacity>
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