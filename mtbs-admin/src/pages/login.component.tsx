import React from "react";
import styled from "styled-components";

import { theme } from "../theme";
import LoginForm from "../components/login-form/login-form.component";

const Login = () => {
  return (
    <LoginPage>
      <LoginForm />
    </LoginPage>
  );
};

const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.palette.background.default};
`;

export default Login;
