import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogOfUsageScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log of Usage</Text>
      {/* Add your log of usage content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LogOfUsageScreen;