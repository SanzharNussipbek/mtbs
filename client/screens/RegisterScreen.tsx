import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../utils/gql";

const RegisterScreen = () => {
  const [errors, setErrors] = useState<any | null>(null);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigation = useNavigation();

  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    update(_, { data: { register: userData } }) {
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
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, []);

  const onSubmit = () => {
    register({ variables: values });
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
          placeholder='First name'
          value={values.firstname}
          onChangeText={(value: string) =>
            setValues({ ...values, firstname: value })
          }
          style={{
            color: "white",
            fontSize: 18,
            width: "100%",
            marginVertical: 25,
          }}
        />

        <TextInput
          placeholder='Last name'
          value={values.lastname}
          onChangeText={(value: string) =>
            setValues({ ...values, lastname: value })
          }
          style={{
            color: "white",
            fontSize: 18,
            width: "100%",
            marginVertical: 25,
          }}
        />

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

        <TextInput
          placeholder='Confirm Password'
          autoCapitalize='none'
          value={values.confirmPassword}
          onChangeText={(value: string) =>
            setValues({ ...values, confirmPassword: value })
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
          style={{
            backgroundColor: "#e33062",
            height: 50,
            borderRadius: 5,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          {loading && <ActivityIndicator />}
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>

        <Pressable
          // disabled={loading}
          onPress={() => {
            navigation.navigate("Login");
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
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;
