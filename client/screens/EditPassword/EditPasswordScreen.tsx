import React, { useEffect, useState } from "react";
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
import SnackBar from "react-native-snackbar-component";

import { User } from "../../types/types";
import { RootStackScreenProps } from "../../types";
import {
  CHANGE_PASSWORD_MUTATION,
  UPDATE_USER_MUTATION,
} from "../../utils/gql";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser } from "../../redux/user/user.actions";
import { selectUser } from "../../redux/user/user.selector";

import { styles } from "./EditPasswordScreen.styles";

const EmptyUserData = {
  id: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function EditPasswordScreen(
  props: RootStackScreenProps<"EditPassword">
) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cancelRef = React.useRef(null);

  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errors, setErrors] = useState(EmptyUserData);
  const [values, setValues] = useState({
    id: user?.id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<"SUCCESS" | "ERROR">(
    "SUCCESS"
  );

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    update(_, { data: { changePassword: userData } }) {
      setIsLoading(false);
      dispatch(updateUser(userData));
      setSnackbarStatus("SUCCESS");
      setShowSnackbar(true);
      AsyncStorage.setItem("token", userData?.token).then(() => {
        navigation.navigate("Root");
      });
    },
    onError(err) {
      setIsLoading(false);
      setSnackbarStatus("ERROR");
      setShowSnackbar(true);
      // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      Alert.alert("ERROR", err?.message);
    },
    variables: values,
  });

  const onSubmit = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleConfirm = () => {
    setShowAlert(false);
    setIsLoading(true);
    changePassword({ variables: values });
  };

  useEffect(() => {
    setIsSubmitDisabled(
      values.oldPassword.length === 0 ||
        values.newPassword.length === 0 ||
        values.confirmPassword.length === 0
    );
  }, [values]);

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
          isInvalid={errors?.oldPassword?.length !== 0}
          isDisabled={isLoading}
        >
          <FormControl.Label _text={styles.inputLabel}>
            Old Password
          </FormControl.Label>
          <Input
            value={values.oldPassword}
            onChangeText={(value: string) =>
              setValues({ ...values, oldPassword: value })
            }
            _disabled={{
              color: "grey",
            }}
            size="2xl"
            color={"white"}
            type="password"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors?.oldPassword}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          style={styles.formControl}
          isInvalid={errors?.newPassword?.length !== 0}
          isDisabled={isLoading}
        >
          <FormControl.Label _text={styles.inputLabel}>
            New Password
          </FormControl.Label>
          <Input
            value={values.newPassword}
            onChangeText={(value: string) =>
              setValues({ ...values, newPassword: value })
            }
            _disabled={{
              color: "grey",
            }}
            size="2xl"
            color={"white"}
            type="password"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors?.newPassword}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          style={styles.formControl}
          isInvalid={
            errors?.confirmPassword?.length !== 0 ||
            (values.confirmPassword.length > 0 &&
              values.newPassword.length > 0 &&
              values.newPassword !== values.confirmPassword)
          }
          isDisabled={isLoading}
        >
          <FormControl.Label _text={styles.inputLabel}>
            Confirm Password
          </FormControl.Label>
          <Input
            value={values.confirmPassword}
            onChangeText={(value: string) =>
              setValues({ ...values, confirmPassword: value })
            }
            _disabled={{
              color: "grey",
            }}
            size="2xl"
            type="password"
            color={"white"}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors?.confirmPassword
              ? errors?.confirmPassword
              : values.confirmPassword.length > 0 &&
                values.newPassword.length > 0 &&
                values.newPassword !== values.confirmPassword
              ? "Passwords do not match."
              : ""}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          size="lg"
          variant="solid"
          colorScheme={isSubmitDisabled ? "muted" : "secondary"}
          onPress={onSubmit}
          style={{
            borderRadius: 5,
            marginTop: 64,
          }}
          isLoading={isLoading}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </View>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={showAlert}
        onClose={handleClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Change Passsword</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to change your password ?
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
