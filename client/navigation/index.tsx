/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import NewsScreen from "../screens/NewsScreen";
import TicketsScreen from "../screens/TicketsScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ProfileScreen from "../screens/ProfileScreen";
import MovieScreen from "../screens/Movie/MovieScreen";
import PostScreen from "../screens/Post/PostScreen";
import LoadingScreen from "../screens/LoadingScreen";
import EditProfileScreen from "../screens/EditProfile/EditProfileScreen";
import EditPasswordScreen from "../screens/EditPassword/EditPasswordScreen";
import SessionScreen from "../screens/Session/SessionScreen";
import SessionTicketScreen from "../screens/SessionTicket/SessionTicketScreen";
import FaqScreen from "../screens/Faq/FaqScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Loading'
        component={LoadingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Movie'
        component={MovieScreen}
        options={{ title: "About the movie", headerShown: false }}
      />
      <Stack.Screen
        name='Post'
        component={PostScreen}
        options={{ title: "Post", headerShown: false }}
      />
      <Stack.Screen
        name='Session'
        component={SessionScreen}
        options={{ title: "Session" }}
      />
      <Stack.Screen
        name='SessionTicket'
        component={SessionTicketScreen}
        options={{ title: "Ticket", headerBackVisible: false }}
      />
      <Stack.Screen
        name='EditProfile'
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name='EditPassword'
        component={EditPasswordScreen}
        options={{ title: "Change Password" }}
      />
      <Stack.Screen
        name='FAQ'
        component={FaqScreen}
        options={{ title: "FAQ" }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: "Oops!", headerShown: false }}
      />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
         <Stack.Screen name="Modal" component={ModalScreen} />
       </Stack.Group> */}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: "Home",
          headerTitle: "MTBS",
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#f472b6",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='home' color={focused ? "#f472b6" : color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='News'
        component={NewsScreen}
        options={{
          title: "News",
          headerTitle: "MTBS",
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#f472b6",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name='newspaper-o'
              color={focused ? "#f472b6" : color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name='Tickets'
        component={TicketsScreen}
        options={{
          title: "Tickets",
          headerTitle: "MTBS",
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#f472b6",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='ticket' color={focused ? "#f472b6" : color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerTitle: "MTBS",
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#f472b6",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='user' color={focused ? "#f472b6" : color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
