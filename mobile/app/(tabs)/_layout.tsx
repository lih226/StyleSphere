import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs screenOptions=
      {{
        tabBarActiveTintColor: '#ff',
        headerStyle: {
          backgroundColor: '#FCF2FF',
        },
        headerShadowVisible: false,
        headerTintColor: '#ff',
        tabBarStyle: {
        backgroundColor: '#FCF2FF',
      }}}>

      <Tabs.Screen name="index" options={{
        title: 'Home', 
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
        )
      }} />

      <Tabs.Screen name="saved" options={{
        title: "Saved",
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused ? 'bookmarks' : 'bookmarks-outline'} color={color} size={24}/>
        )
      }}/>

      <Tabs.Screen name="create" options={{
        title: 'Create',
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={24}/>
        )}}/>
      
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24}/>
        )}}/>
    </Tabs>
  );
}