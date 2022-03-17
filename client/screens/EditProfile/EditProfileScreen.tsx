import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AlertDialog,
  Button,
  FormControl,
  Input,
  WarningOutlineIcon,
} from "native-base";

import { User } from "../../types/types";
import { UPDATE_USER } from "../../utils/gql";
import { RootStackScreenProps } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser } from "../../redux/user/user.actions";
import { selectUser } from "../../redux/user/user.selector";
import { openSnackbar } from "../../redux/loading/loading.slice";

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
  const cancelRef = React.useRef(null);

  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState<Partial<User>>(EmptyUserData);
  const [values, setValues] = useState<Partial<User>>({
    id: user?.id,
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    phone: user?.phone,
  });

  const [updateUserService, { called, loading }] = useMutation(
    UPDATE_USER,
    {
      update(_, { data: { updateUser: userData } }) {
        dispatch(updateUser(userData));
        dispatch(
          openSnackbar({
            severity: "success",
            message: "Your information is updated successfully!",
          })
        );
        AsyncStorage.setItem("token", userData?.token).then(() => {
          navigation.navigate("Root");
        });
      },
      onError(err) {
        Alert.alert("ERROR", err?.message);
        setErrors(err?.graphQLErrors[0]?.extensions?.errors as Partial<User>);
      },
      variables: values,
    }
  );

  const onSubmit = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleConfirm = () => {
    setShowAlert(false);
    updateUserService({ variables: values });
  };

  const handleChangePassword = () => {
    navigation.navigate("EditPassword");
  };

  return user ? (
    <View style={styles.container}>
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
        <Button.Group direction="column">
          <Button
            size="lg"
            variant="solid"
            colorScheme="secondary"
            onPress={onSubmit}
            style={{
              borderRadius: 5,
              marginTop: 64,
            }}
            isLoading={called && loading}
            isDisabled={
              values.firstname === user.firstname &&
              values.lastname === user.lastname &&
              values.email === user.email &&
              values.phone === user.phone
            }
          >
            Submit
          </Button>
          <Button
            size="lg"
            variant="outline"
            colorScheme="secondary"
            onPress={handleChangePassword}
            style={{
              borderRadius: 5,
              marginTop: 64,
            }}
            disabled={called && loading}
          >
            Change Password
          </Button>
        </Button.Group>
      </View>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={showAlert}
        onClose={handleClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Edit Profile</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to edit your profile details ?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={handleClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="success" onPress={handleConfirm}>
                Confirm
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </View>
  ) : null;
}
