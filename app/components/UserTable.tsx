import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import axiosInstance from '../api/axiosConfig';
import UserTableType from '../types/userTable';
import { Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from 'expo-router';
import { Routes } from '../types/routes';

export default function UserTable() {
    const [users, setUsers] = useState<UserTableType[]>([]); // Explicitly define the type
    const [page, setPage] = useState(1); // Current page
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true); // Whether more data is available

    // Reset state when component mounts
    useEffect(() => {
        setUsers([]); // Clear the users list
        setPage(1); // Reset the page to 1
        setHasMore(true); // Reset the hasMore flag
        fetchUsers(); // Fetch fresh data
    }, []); // Empty dependency array ensures this runs only on mount

    const fetchUsers = async () => {
        if (loading || !hasMore) return; // Prevent multiple requests
        setLoading(true);

        try {
            let newUsers: any = null;

            const response = await axiosInstance.post<{
                data: UserTableType[];
                current_page: number;
                per_page: number;
                total: number;
            }>('/user-manage', {
                page,
                per_page: 10,
            });

            console.log('API Response:', response.data); // Log the entire response

            newUsers = response.data.data;

            if (newUsers && newUsers.length > 0) {
                setUsers((prevUsers) => [...prevUsers, ...newUsers]); // Append new data
                setPage((prevPage) => prevPage + 1); // Increment page
            } else {
                setHasMore(false); // No more data to load
             
            }

        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const windowWidth = Dimensions.get('window').width;
    const scrollViewRef = useRef(null);

    // Define column widths
    const columnWidths = {
        user: windowWidth * 0.25,
        joinDate: windowWidth * 0.25,
        balance: windowWidth * 0.2,
        action: windowWidth * 0.3,
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

                <Pressable
                    style={({ pressed }) => ({
                        backgroundColor: pressed ? '#dc2626' : '#ef4444',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 6,
                    })}
                    onPress={() => console.log('Delete:', item.id)}
                >
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '500' }}>Delete</Text>
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
        </View>
    );
}