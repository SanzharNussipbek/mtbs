import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  pending?: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const Dialog: React.FC<Props> = ({
  open,
  title,
  description,
  confirmText,
  pending,
  onClose,
  onSubmit,
}) => {
  return (
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {title}
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" size="large" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton
          size="large"
          onClick={onSubmit}
          pending={pending || false}
        >
          {confirmText}
        </LoadingButton>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
