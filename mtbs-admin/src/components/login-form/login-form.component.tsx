import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useAppDispatch } from "../../hooks";
import { LOGIN_USER } from "../../utils/gql/user";
import { loginUser, logoutUser } from "../../redux/user/user.actions";

import Loader from "../loader/loader.component";

import Styled from "./login-form.styles";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      dispatch(loginUser(userData));
      localStorage.setItem("token", userData?.token);
      localStorage.setItem("user", JSON.stringify(userData, null, 2));
      history.push("/admin");
    },
    onError(err: any) {
      setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: {
      email: "admin@mail.com",
      password: "admin",
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    if (username === "admin" && password === "admin") {
      login({
        variables: {
          email: "admin@mail.com",
          password: "admin",
        },
      });
    } else {
      setErrors({
        username:
          username !== "admin"
            ? username !== ""
              ? "Wrong username"
              : "Please fill username"
            : "",
        password:
          password !== "admin"
            ? password !== ""
              ? "Wrong password"
              : "Please fill password"
            : "",
      });
    }
  };

  useEffect(() => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Styled.LoginForm>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in as Admin
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={errors?.username?.length > 0}
              helperText={errors?.username?.length > 0 && errors?.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors?.password?.length > 0}
              helperText={errors?.password?.length > 0 && errors?.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Styled.LoginForm>
  );
};

export default LoginForm;
