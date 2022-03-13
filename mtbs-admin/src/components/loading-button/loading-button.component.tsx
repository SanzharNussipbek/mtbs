import React from "react";
import { ButtonProps, CircularProgress, Fade, Button } from "@mui/material";

type Props = {
  pending: boolean;
  children: React.ReactNode;
} & ButtonProps;

const LoadingButton = ({
  pending = false,
  children,
  disabled,
  ...otherProps
}: Props): JSX.Element => (
  <Button {...otherProps} disabled={disabled || pending}>
    {children}
    <Fade in={pending} unmountOnExit>
      <CircularProgress
        size={15}
        style={{ marginLeft: "5px" }}
        color="inherit"
      ></CircularProgress>
    </Fade>
  </Button>
);

export default LoadingButton;
