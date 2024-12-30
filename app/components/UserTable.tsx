import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, ScrollView, Dimensions } from 'react-native';
import axiosInstance from '../api/axiosConfig';
import { UserTableType } from '../types/userTable';
import { ActivityIndicator } from 'react-native';





export default function UserTable() {
    const datas = [
        { id: '1', name: 'John Doe', joinDate: '2024-01-15', balance: '$1,250' },
        { id: '2', name: 'Jane Smith', joinDate: '2024-02-01', balance: '$2,840' },
        { id: '3', name: 'Robert Johnson', joinDate: '2024-02-15', balance: '$950' },
        { id: '4', name: 'Emily Brown', joinDate: '2024-03-01', balance: '$3,420' },
    ];


    const [users, setUsers] = useState<UserTableType[]>([]); // Explicitly define the type
    const [page, setPage] = useState(1); // Current page
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true); // Whether more data is available

    const fetchUsers = async () => {
        if (loading || !hasMore) return; // Prevent multiple requests
        setLoading(true);

        try {

            const response = await axiosInstance.post<{
                data: UserTableType[];
                current_page: number;
                per_page: number;
                total: number;
            }>('/user-manage', {
                page, // Current page
                per_page: 10, // Number of items per page
            });

            const newUsers = response.data.data; // Assuming the API returns { data: [...] }
            if (newUsers.length > 0) {
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
    const handleLoadMore = () => {
        if (hasMore && !loading) {
            fetchUsers();
        }
    };

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator size="small" color="#3b82f6" style={{ padding: 10 }} />;
    };


    const windowWidth = Dimensions.get('window').width;
    const scrollViewRef = useRef(null);

    const TableHeader = () => (
        <View style={{ flexDirection: 'row', backgroundColor: '#f9fafb', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
            <Text style={{ width: windowWidth * 0.25, fontWeight: '600', color: '#374151', paddingHorizontal: 8 }}>User</Text>
            <Text style={{ width: windowWidth * 0.25, fontWeight: '600', color: '#374151', paddingHorizontal: 8 }}>Join Date</Text>
            <Text style={{ width: windowWidth * 0.2, fontWeight: '600', color: '#374151', paddingHorizontal: 8 }}>Balance</Text>
            <Text style={{ width: windowWidth * 0.3, fontWeight: '600', color: '#374151', paddingHorizontal: 8 }}>Action</Text>
        </View>
    );

    const renderItem = ({ item }: any) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', backgroundColor: '#ffffff' }}>
            <Text style={{ width: windowWidth * 0.25, fontSize: 14, color: '#111827', paddingHorizontal: 8 }} numberOfLines={1}>
                {item.name}
            </Text>
            <Text style={{ width: windowWidth * 0.25, fontSize: 14, color: '#111827', paddingHorizontal: 8 }}>
                {item.joinDate}
            </Text>
            <Text style={{ width: windowWidth * 0.2, fontSize: 14, color: '#111827', paddingHorizontal: 8 }}>
                {item.balance}
            </Text>
            <View style={{ width: windowWidth * 0.3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 8, gap: 8 }}>
                <Pressable
                    style={({ pressed }) => ({
                        backgroundColor: pressed ? '#2563eb' : '#3b82f6',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 6,
                    })}
                    onPress={() => console.log('View details:', item.id)}
                >
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '500' }}>View</Text>
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
            <Text style={{ fontSize: 20, fontWeight: '700', padding: 16, backgroundColor: '#f9fafb', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', color: '#111827' }}>
                User Management
            </Text>
            <ScrollView
                horizontal={true}
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
            >
                <View>
                    {/* Table Header */}
                    <TableHeader />
                    {/* Table Body */}
                    <FlatList
                        data={users}
                        renderItem={renderItem}
                        keyExtractor={(item : any) => item.id}
                        scrollEnabled={false} // Disable FlatList scroll since ScrollView is handling it
                    />
                </View>
            </ScrollView>
        </View>
    );
}