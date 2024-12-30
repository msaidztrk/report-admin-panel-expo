import { View, ScrollView } from "react-native";
import UserTable from "../components/UserTable";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa', padding: 16 }}>
      <UserTable />
    </View>
  );
}