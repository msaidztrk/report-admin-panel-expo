import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { createNewUser, fetchUserData, updateUserData } from "../api/userManage";
import { useLocalSearchParams } from 'expo-router';

export default function UserAddOrUpdate() {
  const [loginName, setLoginName] = useState<string>("");
  const [dcName, setDcName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { id } = useLocalSearchParams();
  console.log("id", id);

  const handleNewUser = () => {
    console.log("Submitted:", { loginName, dcName, password });
    createNewUser(dcName, loginName, password)
  };


  const handleUpdateUser = () => {
    updateUserData(id, dcName, loginName, password)
  }






  useEffect(() => {

    setLoginName("");
    setDcName("");
    setPassword("");
    // Define an async function inside useEffect
    const fetchData = async () => {
      if (id === undefined) {
        console.log("id is undefined");
        return;
      }

      try {
        const userData: any = await fetchUserData(id);
        console.log("userData:", userData);
        setLoginName(userData.email)
        setDcName(userData.discord_name);
        setPassword(userData.password_unhashed)
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    // Call the async function
    fetchData();
  }, [id]);

  return (
    <View className="flex-1 p-6 bg-gray-100">
      <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
        {id ? "Kullanıcı Güncelle" : "Kullanıcı Ekle"}
      </Text>

      {/* Login Name Input */}
      <View className="mb-6">
        <Text className="text-base font-medium text-gray-700 mb-2">Login Name</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500"
          placeholder="Enter Login Name"
          value={loginName}
          onChangeText={setLoginName}
          placeholderTextColor="#999"
        />
      </View>

      {/* DC Name Input */}
      <View className="mb-6">
        <Text className="text-base font-medium text-gray-700 mb-2">DC Name</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500"
          placeholder="Enter DC Name"
          value={dcName}
          onChangeText={setDcName}
          placeholderTextColor="#999"
        />
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <Text className="text-base font-medium text-gray-700 mb-2">Password</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500"
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-blue-500 rounded-lg py-3 mt-4"
        onPress={id ? handleUpdateUser : handleNewUser}
      >
        <Text className="text-lg font-bold text-white text-center">Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
