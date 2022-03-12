import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Styled from "./login-form.styles";

const LoginForm: React.FC = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    if (username === "admin" && password === "admin") {
      history.push("/admin");
    } else {
      setErrors({
        username: username !== "admin" ? "Wrong username" : "",
        password: password !== "admin" ? "Wrong password" : "",
      });
    }
  };

  return (
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
            Sign in
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
              error={errors.username.length > 0}
              helperText={errors.username.length > 0 && errors.username}
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
              error={errors.password.length > 0}
              helperText={errors.password.length > 0 && errors.password}
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
