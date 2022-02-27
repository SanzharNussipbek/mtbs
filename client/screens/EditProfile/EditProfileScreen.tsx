import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, FormControl, Input, WarningOutlineIcon } from "native-base";
import SnackBar from "react-native-snackbar-component";

import { User } from "../../types/types";
import { RootStackScreenProps } from "../../types";
import { UPDATE_USER_MUTATION } from "../../utils/gql";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser } from "../../redux/user/user.actions";
import { selectUser } from "../../redux/user/user.selector";

import { styles } from "./EditProfileScreen.styles";

const EmptyUserData: Partial<User> = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
};

export default function EditProfileScreen(
  props: RootStackScreenProps<"EditProfile">
) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  
  const [errors, setErrors] = useState<Partial<User>>(EmptyUserData);
  const [values, setValues] = useState<Partial<User>>({
    id: user?.id,
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    phone: user?.phone,
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<"SUCCESS" | "ERROR">(
    "SUCCESS"
  );

  const [updateUserService, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    update(_, { data: { updateUser: userData } }) {
      dispatch(updateUser(userData));
      setSnackbarStatus("SUCCESS");
      setShowSnackbar(true);
      AsyncStorage.setItem("token", userData?.token).then(() => {
        navigation.navigate("Root");
      });
    },
    onError(err) {
      setSnackbarStatus("ERROR");
      setShowSnackbar(true);
      console.log(JSON.stringify(err, null, 2));
      setErrors(err?.graphQLErrors[0]?.extensions?.errors as Partial<User>);
    },
    variables: values,
  });

  const onSubmit = () => {
    updateUserService({ variables: values });
  };

  return user ? (
    <View style={styles.container}>
      <SnackBar
        position="top"
        autoHidingTime={3000}
        visible={showSnackbar}
        backgroundColor={snackbarStatus === "SUCCESS" ? "#22c55e" : "#ef4444"}
        textMessage={
          snackbarStatus === "SUCCESS"
            ? "Your information is updated successfully!"
            : "Error while updating the information!"
        }
      />
      <View style={{ width: "100%" }}>
        <FormControl
          style={styles.formControl}
          isInvalid={errors?.firstname?.length !== 0}
          isDisabled={loading}
        >
          <FormControl.Label _text={styles.inputLabel}>
            Firstname
          </FormControl.Label>
          <Input
            value={values.firstname}
            onChangeText={(value: string) =>
              setValues({ ...values, firstname: value })
            }
            _disabled={{
              color: "grey",
            }}
            size="2xl"
            color={"white"}
            placeholder="Enter first name"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors?.firstname}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          style={styles.formControl}
          isInvalid={errors?.lastname?.length !== 0}
          isDisabled={loading}
        >
          <FormControl.Label _text={styles.inputLabel}>
            Lastname
          </FormControl.Label>
          <Input
            value={values.lastname}
            onChangeText={(value: string) =>
              setValues({ ...values, lastname: value })
            }
            _disabled={{
              color: "grey",
            }}
            size="2xl"
            color={"white"}
            placeholder="Enter last name"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors?.lastname}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          style={styles.formControl}
          isInvalid={errors?.email?.length !== 0}
          isDisabled={loading}
        >
          <FormControl.Label _text={styles.inputLabel}>Email</FormControl.Label>
          <Input
            value={values.email}
            onChangeText={(value: string) =>
              setValues({ ...values, email: value })
            }
            _disabled={{
              color: "grey",
            }}
            size="2xl"
            type="email"
            color={"white"}
            placeholder="Enter email"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors?.email}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          style={styles.formControl}
          isInvalid={errors?.phone?.length !== 0}
          isDisabled={loading}
        >
          <FormControl.Label _text={styles.inputLabel}>Phone</FormControl.Label>
          <Input
            value={values.phone}
            onChangeText={(value: string) =>
              setValues({ ...values, phone: value })
            }
            _disabled={{
              color: "grey",
            }}
            size="2xl"
            color={"white"}
            placeholder="Enter phone number"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors?.phone}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          size="lg"
          variant="solid"
          colorScheme="secondary"
          onPress={onSubmit}
          style={{
            borderRadius: 5,
            marginTop: 64,
          }}
          isLoading={loading}
          isDisabled={
            values.firstname === user.firstname &&
            values.lastname === user.lastname &&
            values.email === user.email &&
            values.phone === user.phone
          }
        >
          Submit
        </Button>
      </View>
    </View>
  ) : null;
}
