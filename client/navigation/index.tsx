/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { FontAwesome } from '@expo/vector-icons';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import * as React from 'react';
 import { ColorSchemeName, Pressable } from 'react-native';

 import Colors from '../constants/Colors';
 import useColorScheme from '../hooks/useColorScheme';
import LoginScreen from '../screens/LoginScreen';
 import ModalScreen from '../screens/ModalScreen';
 import NotFoundScreen from '../screens/NotFoundScreen';
import RegisterScreen from '../screens/RegisterScreen';
 import HomeScreen from '../screens/HomeScreen';
 import NewsScreen from '../screens/NewsScreen';
 import TicketsScreen from '../screens/TicketsScreen';
 import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
 import LinkingConfiguration from './LinkingConfiguration';
import ProfileScreen from '../screens/ProfileScreen';
import MovieScreen from '../screens/Movie/MovieScreen';

 export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
   return (
     <NavigationContainer
       linking={LinkingConfiguration}
       theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
       {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
       {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
       <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
       <Stack.Screen name="Movie" component={MovieScreen} options={{ title: 'Movie' }} />
       <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
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
       initialRouteName="Home"
       screenOptions={{
         tabBarActiveTintColor: Colors[colorScheme].tint,
       }}>
       <BottomTab.Screen
         name="Home"
         component={HomeScreen}
         options={{
           title: 'MTBS',
           tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="News"
         component={NewsScreen}
         options={{
           title: 'MTBS',
           tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="Tickets"
         component={TicketsScreen}
         options={{
           title: 'MTBS',
           tabBarIcon: ({ color }) => <TabBarIcon name="ticket" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="Profile"
         component={ProfileScreen}
         options={{
           title: 'MTBS',
           tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
         }}
       />
     </BottomTab.Navigator>
   );
 }

 /**
  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  */
 function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>['name'];
   color: string;
 }) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
 }
