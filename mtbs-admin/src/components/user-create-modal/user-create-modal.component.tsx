import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../utils/gql/user";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
};

const UserCreateModal: React.FC<Props> = ({ open, onClose }) => {
  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      onClose();
    },
    onError(err) {
      console.error(JSON.stringify(err, null, 2));
      // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstname = (data.get("firstname") as string) ?? "";
    const lastname = (data.get("lastname") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const phone = (data.get("phone") as string) ?? null;
    const password = (data.get("password") as string) ?? "";
    const confirmPassword = (data.get("confirmPassword") as string) ?? "";

    const values = {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmPassword,
    };
    
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
        <IconButton onClick={onClose} disabled={loading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          id="user-create-form"
        >
          {/* <Styled.UserCreateForm onSubmit={handleSubmit} id="user-create-form"> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First name"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            // error={errors?.firstname?.length > 0}
            // helperText={errors?.firstname?.length > 0 && errors?.firstname}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last name"
            name="lastname"
            autoComplete="lastname"
            autoFocus
            // error={errors?.lastname?.length > 0}
            // helperText={errors?.lastname?.length > 0 && errors?.lastname}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            // error={errors?.email?.length > 0}
            // helperText={errors?.email?.length > 0 && errors?.email}
          />
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            type="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            autoFocus
            // error={errors?.phone?.length > 0}
            // helperText={errors?.phone?.length > 0 && errors?.phone}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            type="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
            // error={errors?.password?.length > 0}
            // helperText={errors?.password?.length > 0 && errors?.password}
          />
          <TextField
            margin="normal"
            fullWidth
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            autoComplete="confirmPassword"
            autoFocus
            // error={errors?.confirmPassword?.length > 0}
            // helperText={errors?.confirmPassword?.length > 0 && errors?.confirmPassword}
          />
          {/* </Styled.UserCreateForm> */}
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
            disabled={loading}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            size="large"
            pending={loading}
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
