import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import useLogout from '../hooks/useLogout'; // Import the custom hook
import { Link } from 'expo-router';

const Sidebar = ({ navigation }: DrawerContentComponentProps) => {
    const handleLogout = useLogout(); // Use the logout hook

    return (
        <View className="flex-1 bg-gray-900 p-6">
            {/* Sidebar Header */}
            <View className="border-b border-gray-700 pb-4 mb-4">
                <Text className="text-white text-2xl font-bold">User Manage</Text>
            </View>

            {/* Menu Items */}
            <TouchableOpacity
                // onPress={() => navigation.navigate('index')}
                className="py-3"
            >
                <Link href="/screens">
                    <Text className="text-white text-lg font-medium">Home</Text>
                </Link>
            </TouchableOpacity>
            <TouchableOpacity
                // onPress={() => navigation.navigate('about', { screen: 'about' })}
                className="py-3"
            >
                <Link href="/screens/about">
                    <Text className="text-white text-lg font-medium">About</Text>
                </Link>
            </TouchableOpacity>
            <TouchableOpacity
                // onPress={() => navigation.navigate('logOfUsage', { screen: 'logOfUsage' })}
                className="py-3"
            >
                <Link href="/screens/logOfUsage">
                    <Text className="text-white text-lg font-medium">Log of Usage</Text>
                </Link>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
                onPress={handleLogout}
                className="mt-6 bg-red-600 py-3 rounded-lg"
            >
                <Text className="text-white text-center text-lg font-bold">Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Sidebar;