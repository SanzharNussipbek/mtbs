import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";

import { User } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { UPDATE_USER } from "../../utils/gql/user";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  data: User | null;
  open: boolean;
  onClose: () => void;
};

const UserEditModal: React.FC<Props> = ({ data, open, onClose }) => {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState({
    id: data?.id?.length ? data?.id : "",
    firstname: data?.firstname?.length ? data?.firstname : "",
    lastname: data?.lastname?.length ? data?.lastname : "",
    email: data?.email?.length ? data?.email : "",
    phone: data?.phone?.length ? data?.phone : "",
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: values,
  });

  const [updateUser, { called, loading }] = useMutation(UPDATE_USER, {
    update(_, { data: { updateUser: userData } }) {
      dispatch(
        openSnackbar({
          message: "User updated successfully!",
          severity: "success",
        })
      );
      onClose();
    },
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while updating the user. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
      // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: values,
  });

  const onSubmit = async (v: any, e: any) => {
    e.preventDefault();
    console.table(values);
    updateUser({ variables: values });
  };

  useEffect(() => {
    setValues({
      id: data?.id?.length ? data?.id : "",
      firstname: data?.firstname?.length ? data?.firstname : "",
      lastname: data?.lastname?.length ? data?.lastname : "",
      email: data?.email?.length ? data?.email : "",
      phone: data?.phone?.length ? data?.phone : "",
    });
  }, [data]);

  return (
    <Dialog open={open}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Edit User
        <IconButton onClick={onClose} disabled={loading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="user-edit-form"
        >
          <Controller
            name="firstname"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                value={values?.firstname}
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                error={!!errors.firstname}
                helperText={errors.firstname && errors.firstname.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, firstname: e.target.value });
                }}
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                value={values?.lastname}
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last name"
                name="lastname"
                autoComplete="lastname"
                error={!!errors.lastname}
                helperText={errors.lastname && errors.lastname.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, lastname: e.target.value });
                }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Required field",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                value={values?.email}
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
                onChange={(e) => {
                  props.field?.onChange(e);
                  setValues({ ...values, email: e.target.value });
                }}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              pattern: {
                value: /^[0-9\s+-]+$/,
                message: "Please type in correct numbers",
              },
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                value={values?.phone}
                margin="normal"
                fullWidth
                id="phone"
                type="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                error={!!errors.phone}
                helperText={errors.phone && errors.phone.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, phone: e.target.value });
                }}
              />
            )}
          />
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 16,
          }}
        >
          <Button
            color="secondary"
            size="large"
            onClick={onClose}
            disabled={called && loading}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            size="large"
            pending={called && loading}
            form="user-edit-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditModal;
