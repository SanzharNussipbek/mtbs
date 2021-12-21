import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../utils/gql";

const LoginScreen = () => {
  const [errors, setErrors] = useState<any | null>(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    update(_, { data: { login: userData } }) {
      AsyncStorage.setItem("token", userData?.token).then(() => {
        navigation.navigate("Root");
      });
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: values,
  });

  useEffect(() => {
    if (!errors?.general) return;
    Alert.alert(errors.general);
  }, [errors]);

  useEffect(() => {
    setValues({
      email: "",
      password: "",
    });
  }, []);

  const onSubmit = () => {
    login({ variables: values });
  };

  return (
    <View
      style={{
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View style={{ width: "100%" }}>
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          value={values.email}
          onChangeText={(value: string) =>
            setValues({ ...values, email: value })
          }
          style={{
            color: "white",
            fontSize: 18,
            width: "100%",
            marginVertical: 25,
          }}
        />
        <TextInput
          placeholder='Password'
          autoCapitalize='none'
          value={values.password}
          onChangeText={(value: string) =>
            setValues({ ...values, password: value })
          }
          secureTextEntry
          style={{
            color: "white",
            fontSize: 18,
            width: "100%",
            marginVertical: 25,
          }}
        />
        <Pressable
          onPress={onSubmit}
          // disabled={loading}
          style={{
            backgroundColor: "#e33062",
            height: 50,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            console.warn("nbavigate");
            navigation.navigate("Register");
          }}
          style={{
            height: 50,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "#e33062",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            New here? Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
