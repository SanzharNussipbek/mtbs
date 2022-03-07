import React, { useCallback, useState } from "react";
import { Image, ScrollView, Pressable, Linking } from "react-native";
import {
  Button,
  Heading,
  Text as NativeText,
  ChevronLeftIcon,
  Link,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../types";
import { Session } from "../../types/types";

import NotFoundScreen from "../NotFoundScreen";

import { styles } from "./SessionScreen.styles";

export default function SessionScreen(props: RootStackScreenProps<"Session">) {
  const navigation = useNavigation();
  const session: Session = props?.route?.params?.session;

  const handleGoBack = () => {
    navigation.navigate("Root");
  };

  return session ? (
    <ScrollView style={styles.container}>
      
    </ScrollView>
  ) : (
    NotFoundScreen
  );
}
