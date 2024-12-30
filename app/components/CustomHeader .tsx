import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer'; 

type CustomHeaderNavigationProp = DrawerNavigationProp<any>; 

const CustomHeader = () => {
  const navigation = useNavigation<CustomHeaderNavigationProp>();
  const route = useRoute();

  // Hide the header on the login page
  if (route.name === 'login') {
    return null;
  }
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});

export default CustomHeader;