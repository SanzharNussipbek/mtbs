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
import { Button } from "native-base";
import Loader from "../components/loader/loader.component";

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

  const [register, { called, loading }] = useMutation(REGISTER_MUTATION, {
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
      {called && loading ? (
        <Loader text="Registration in process..."/>
      ) : (
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
            placeholderTextColor="grey"
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
            placeholderTextColor="grey"
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
            placeholderTextColor="grey"
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
            placeholderTextColor="grey"
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
            placeholderTextColor="grey"
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
            isDisabled={
              !values.firstname?.length ||
              !values.lastname?.length ||
              !values.email?.length ||
              !values.password?.length ||
              !values.confirmPassword?.length
            }
          >
            Register
          </Button>
          <Button
            size='lg'
            variant='ghost'
            colorScheme='secondary'
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={{
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            Already have an account? Login
          </Button>
        </View>
      )}
    </View>
  );
};

export default RegisterScreen;
