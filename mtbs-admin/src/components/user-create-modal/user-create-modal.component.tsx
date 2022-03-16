import React, { useState } from "react";
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

import { useAppDispatch } from "../../hooks";
import { REGISTER_USER } from "../../utils/gql/user";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateCallback: () => void;
};

const UserCreateModal: React.FC<Props> = ({ open, onClose, onCreateCallback }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [register] = useMutation(REGISTER_USER, {
    update(_, { data }) {
      setIsLoading(false);
      onCreateCallback();
      onClose();
      dispatch(
        openSnackbar({
          message: "User created successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      setIsLoading(false);
      dispatch(
        openSnackbar({
          message: "Error while creating the user. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
    variables: defaultValues,
  });

  const onSubmit = async (values: any, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    register({ variables: values });
  };

  return (
    <Dialog open={open}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Create User
        <IconButton onClick={onClose} disabled={isLoading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="user-create-form"
        >
          <Controller
            name="firstname"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
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
                onChange={(value) => {
                  props?.field?.onChange(value);
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
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last name"
                name="lastname"
                autoComplete="lastname"
                error={!!errors.lastname}
                helperText={errors.lastname && errors.lastname.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
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
                onChange={(value) => {
                  props.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="phone"
                type="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                error={!!errors.phone}
                helperText={errors.phone && errors.phone.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="password"
                type="password"
                label="Password"
                name="password"
                autoComplete="password"
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="confirmPassword"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword && errors.confirmPassword.message
                }
                onChange={(value) => {
                  props?.field?.onChange(value);
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
            disabled={isLoading}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            size="large"
            pending={isLoading}
            form="user-create-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserCreateModal;
