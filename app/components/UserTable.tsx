import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, ScrollView, Dimensions, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axiosInstance from '../api/axiosConfig';
import UserTableType from '../types/userTable';
import { Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from 'expo-router';
import { Routes } from '../types/routes';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { Modal } from 'react-native';
import { addBalance } from '../api/balanceManage';

export default function UserTable() {
    const [users, setUsers] = useState<UserTableType[]>([]); // Explicitly define the type
    const [page, setPage] = useState(1); // Current page
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true); // Whether more data is available
    const [popupVisible, setPopupVisible] = useState(false); // Popup visibility state
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Selected item ID for the popup
    const [inputValue, setInputValue] = useState(''); // Input value for the popup

    // Memoize the fetchUsers function
    const fetchUsers = useCallback(async () => {
        if (loading || !hasMore) return; // Prevent multiple requests
        setLoading(true);

        try {
            const response = await axiosInstance.post<{
                data: UserTableType[];
                current_page: number;
                per_page: number;
                total: number;
            }>('/user-manage', {
                page,
                per_page: 10,
            });

            console.log('API Response:', response.data);

            const newUsers = response.data.data;

            if (newUsers && newUsers.length > 0) {
                setUsers(newUsers); // Append new data
                setPage(0); // Increment page
            } else {
                setHasMore(false); // No more data to load
            }
        } catch (error : any) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]); // Dependencies for useCallback

    // Fetch users when the component mounts or the page changes
    useEffect(() => {
        fetchUsers();
    }, [page]); // Only re-run when fetchUsers changes


    const windowWidth = Dimensions.get('window').width;
    const scrollViewRef = useRef(null);

    // Define column widths
    const columnWidths = {
        user: windowWidth * 0.25,
        joinDate: windowWidth * 0.25,
        balance: windowWidth * 0.2,
        action: windowWidth * 0.3,
    };


    const handleOpenPopup = (itemId: number) => {
        setSelectedUserId(itemId);
        setPopupVisible(true);
    };

    // Close the popup and reset the selected item ID
    const handleClosePopup = () => {
        setPopupVisible(false);
        setSelectedUserId(null);
        setInputValue(''); // Clear the input field
    };

    const handlePopupSubmit = async () => {

        if (!selectedUserId) return; // Ensure an item ID is selected

        try {
            addBalance(selectedUserId, inputValue);
            handleClosePopup();
        } catch (error) {
            console.error('API Error:', error);
        }
    };


    // Total table width
    const tableWidth = Object.values(columnWidths).reduce((sum, width) => sum + width, 0);

    const TableHeader = () => (
        <View style={{ flexDirection: 'row', backgroundColor: '#f9fafb', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', width: tableWidth }}>
            <Text style={{ width: columnWidths.user, fontWeight: '600', color: '#374151', paddingHorizontal: 8 }}>User</Text>
            <Text style={{ width: columnWidths.joinDate, fontWeight: '600', color: '#374151', paddingHorizontal: 8 }}>Join Date</Text>
            <Text style={{ width: columnWidths.balance, fontWeight: '600', color: '#374151', paddingHorizontal: 8 }}>Balance</Text>
            <Text style={{ width: columnWidths.action, fontWeight: '600', color: '#374151', paddingHorizontal: 8 }}>Action</Text>
        </View>
    );

    const renderItem = ({ item }: any) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', backgroundColor: '#ffffff', width: tableWidth }}>
            <Text style={{ width: columnWidths.user, fontSize: 14, color: '#111827', paddingHorizontal: 8 }} numberOfLines={1}>
                {item.name}
            </Text>
            <Text style={{ width: columnWidths.joinDate, fontSize: 14, color: '#111827', paddingHorizontal: 8 }}>
                {item.joinDate}
            </Text>
            <Text style={{ width: columnWidths.balance, fontSize: 14, color: '#111827', paddingHorizontal: 8 }}>
                {item.balance}
            </Text>
            <View style={{ width: columnWidths.action, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 8, gap: 8 }}>
                <Pressable>
                    <Link
                        href={`${Routes.USER_ADD_OR_UPDATE}${item.id}`}
                        asChild>
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome6 name="pen-to-square" size={24} color="#841584" />
                        </Pressable>
                    </Link>
                </Pressable>


                <Pressable onPress={() => handleOpenPopup(item.id)}>
                    <Text>
                        <MaterialIcons name="monetization-on" size={24} color="black" />
                    </Text>
                </Pressable>

            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}>

            <ScrollView
                horizontal={true}
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ width: tableWidth }}>
                    {/* Table Header */}
                    <TableHeader />
                    {/* Table Body */}
                    <FlatList
                        data={users}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item.id}
                        scrollEnabled={false} // Disable FlatList scroll since ScrollView is handling it
                    />
                </View>
            </ScrollView>




            {/* Popup Modal */}
            <Modal
                visible={popupVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={handleClosePopup}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="w-4/5 bg-white rounded-lg shadow-lg p-5">
                        <Text className="text-xl font-bold text-center mb-4">Bakiye Ekle</Text>
                        <TextInput
                            className="h-10 border border-gray-300 rounded px-3 mb-4"
                            placeholder="Miktar girin"
                            value={inputValue}
                            onChangeText={setInputValue}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            className="bg-blue-500 py-2 px-4 rounded mb-2 items-center"
                            onPress={handlePopupSubmit}
                        >
                            <Text className="text-white font-bold">Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-red-500 py-2 px-4 rounded items-center"
                            onPress={handleClosePopup}
                        >
                            <Text className="text-white font-bold">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
    },
});