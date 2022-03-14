import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { Styled } from "./custom-snackbar.styles";
import {
  selectSnackbarOpen,
  selectSnackbarSeverity,
  selectSnackbarMessage,
} from "../../redux/loading/loading.selector";
import { closeSnackbar } from "../../redux/loading/loading.slice";

const CustomSnackbar: React.FC = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectSnackbarOpen);
  const severity = useSelector(selectSnackbarSeverity);
  const message = useSelector(selectSnackbarMessage);

  const handleClose = (
    event: React.SyntheticEvent<any> | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <Styled.CustomSnackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            className="custom-snackbar__close-icon"
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Styled.CustomSnackbar>
  );
};

export default CustomSnackbar;
