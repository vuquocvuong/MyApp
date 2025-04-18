import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import StoryViewerScreen from '../screens/StoryViewerScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack trong tab Home (nếu bạn có điều hướng sâu trong Home)
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Insgram" component={HomeScreen} />
    <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    <Stack.Screen name="StoryViewer" component={StoryViewerScreen} />
  </Stack.Navigator>
);

// Tab Navigator chính
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Upload') iconName = 'add-circle-outline';
        else if (route.name === 'Profile') iconName = 'person-outline';

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Upload" component={UploadScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// App Navigator chính (Stack bao toàn bộ)
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        {/* Các màn hình độc lập nếu cần */}
        <Stack.Screen name="StoryViewer" component={StoryViewerScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
