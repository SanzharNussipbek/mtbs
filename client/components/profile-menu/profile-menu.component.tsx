import React from "react";
import { Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Heading, Pressable, Text as NativeText } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text, View } from "../Themed";
import { useAppDispatch } from "../../hooks";
import { logoutUser } from "../../redux/user/user.actions";

import { styles } from "./profile-menu.styles";

const ProfileMenu: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handlePress = (name: string) => {
    switch (name) {
      case "EDIT_PROFILE":
        navigation.navigate("EditProfile");
        return;
      case "FAQ":
        navigation.navigate("FAQ");
        return;
      case "SETTINGS":
        Alert.alert(
          "Oops..",
          "You can't change your settings yet.\nThat feature will be here soon!"
        );
        return;
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.menu}>
      <Pressable
        style={styles.menuItem}
        onPress={() => handlePress("EDIT_PROFILE")}
      >
        <View style={styles.menuItemIcon}>
          <Text>
            <FontAwesome size={30} name={"edit"} color={"#db2777"} />
          </Text>
        </View>
        <View style={styles.menuItemBody}>
          <Heading color="secondary.500" size="md" style={styles.menuItemText}>
            Edit profile
          </Heading>
        </View>
      </Pressable>
      <Pressable
        style={styles.menuItem}
        onPress={() => handlePress("SETTINGS")}
      >
        <View style={styles.menuItemIcon}>
          <Text>
            <FontAwesome size={30} name={"cog"} color={"#db2777"} />
          </Text>
        </View>
        <View style={styles.menuItemBody}>
          <Heading color="secondary.500" size="md" style={styles.menuItemText}>
            Settings
          </Heading>
        </View>
      </Pressable>
      <Pressable style={styles.menuItem} onPress={() => handlePress("FAQ")}>
        <View style={styles.menuItemIcon}>
          <Text>
            <FontAwesome size={30} name={"question-circle"} color={"#db2777"} />
          </Text>
        </View>
        <View style={styles.menuItemBody}>
          <Heading color="secondary.500" size="md" style={styles.menuItemText}>
            FAQ
          </Heading>
        </View>
      </Pressable>
      <Pressable
        style={[styles.menuItem, styles.menuItemLast]}
        onPress={handleLogout}
      >
        <View style={styles.menuItemIcon}>
          <Text>
            <FontAwesome size={30} name={"sign-out"} color={"#db2777"} />
          </Text>
        </View>
        <View style={styles.menuItemBody}>
          <Heading color="secondary.500" size="md" style={styles.menuItemText}>
            Logout
          </Heading>
        </View>
      </Pressable>
    </View>
  );
};

export default ProfileMenu;
