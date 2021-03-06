/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

 import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
 import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
 import { NativeStackScreenProps } from '@react-navigation/native-stack';

 declare global {
   namespace ReactNavigation {
     interface RootParamList extends RootStackParamList {}
   }
 }

 // export type RootStackParamList = {
 //   Root: NavigatorScreenParams<RootTabParamList> | undefined;
 //   Modal: undefined;
 //   NotFound: undefined;
 // };

 export type RootStackParamList = {
   Loading: undefined;
   Root: undefined;
   Login: undefined;
   Register: undefined;
   NotFound: undefined;
   Movie: { id: string };
   Post: { id: string };
   Session: { id: string };
   SessionTicket: undefined;
   EditProfile: undefined;
   EditPassword: undefined;
   FAQ: undefined;
 };

 export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   Screen
 >;

 export type RootTabParamList = {
   Home: undefined;
   News: undefined;
   Tickets: undefined;
   Profile: undefined;
 };

 export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
   BottomTabScreenProps<RootTabParamList, Screen>,
   NativeStackScreenProps<RootStackParamList>
 >;
