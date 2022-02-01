import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../utils/gql";
import { Button } from "native-base";
import Loader from "../components/loader/loader.component";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [errors, setErrors] = useState<any | null>(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    update(_, { data: { login: userData } }) {
      AsyncStorage.setItem("user", JSON.stringify(userData, null, 2));
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
      {loading ? (
        <Loader />
      ) : (
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
          <Button
            size='lg'
            variant='solid'
            colorScheme='secondary'
            onPress={onSubmit}
            style={{
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            Login
          </Button>
          <Button
            size='lg'
            variant='ghost'
            colorScheme='secondary'
            onPress={() => {
              navigation.navigate("Register");
            }}
            style={{
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            New here? Register
          </Button>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
