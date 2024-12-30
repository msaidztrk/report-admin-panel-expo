import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home", // Label for the tab bar
          headerShown: false, // Hide the header for this screen
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarLabel: "About", // Label for the tab bar
          headerShown: false, // Hide the header for this screen
        }}
      />
    </Tabs>
  );
}