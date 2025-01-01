import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import UserTable from "../components/UserTable";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white rounded-lg p-4 shadow-lg mb-4">
        <Link href="/screens/userAddOrUpdate" asChild>
          <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-lg">
            <Text className="text-white text-lg font-medium text-center">
              Kullanıcı Oluştur
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      <UserTable />
    </View>
  );
}