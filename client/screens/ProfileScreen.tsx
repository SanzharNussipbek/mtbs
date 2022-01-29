import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { User } from "../types/types";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const [user, setUser] = useState<User | null>(null);

  AsyncStorage.getItem("user", (err, result) => {
    const data = JSON.parse(result ?? "");
    if (!data) return;
    setUser(data);
  });

  return user ? (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.img}
          source={require("client/assets/images/profile.png")}
        />
        <Text style={styles.title}>{`${user.firstname} ${user.lastname}`}</Text>
      </View>
      <View style={styles.container}>
        <Pressable
          style={{
            backgroundColor: "#e33062",
            height: 50,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            minWidth: 200,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Profile
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#e33062",
            height: 50,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
            minWidth: 200,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Settings
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#e33062",
            height: 50,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 32,
            minWidth: 200,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
});
