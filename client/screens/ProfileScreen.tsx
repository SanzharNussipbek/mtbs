import React, { useEffect } from "react";
import { StyleSheet, Image } from "react-native";

import { useAppSelector } from "../hooks";
import { RootTabScreenProps } from "../types";
import { Text, View } from "../components/Themed";
import { selectUser } from "../redux/user/user.selector";

import ProfileMenu from "../components/profile-menu/profile-menu.component";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) return;
    navigation.navigate("Login");
  }, [user]);

  return user ? (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Image
            style={styles.img}
            source={require("../assets/images/profile.png")}
          />
        </View>
        <View style={styles.userInfo}>
          <Text
            style={styles.title}
          >{`${user.firstname} ${user.lastname}`}</Text>
          <Text style={styles.subtitle}>{`${user.email}`}</Text>
          {user.phone ? (
            <Text style={styles.subtitle}>{`${user.phone}`}</Text>
          ) : null}
        </View>
      </View>
      <ProfileMenu />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  profile: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    height: 100,
  },
  container: {
    flex: 1,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  avatar: {
    width: 100,
    height: "100%",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
  },
});
