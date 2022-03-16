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

import { Faq } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { UPDATE_FAQ } from "../../utils/gql/faq";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  data: Faq | null;
  open: boolean;
  onClose: () => void;
};

const FaqEditModal: React.FC<Props> = ({ data, open, onClose }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    id: data?.id?.length ? data?.id : "",
    title: data?.title?.length ? data?.title : "",
    body: data?.body?.length ? data?.body : "",
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: values,
  });

  const [updateFaq] = useMutation(UPDATE_FAQ, {
    update(_, { data }) {
      setIsLoading(false);
      onClose();
      dispatch(
        openSnackbar({
          message: "FAQ updated successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      setIsLoading(false);
      dispatch(
        openSnackbar({
          message: "Error while updating the FAQ. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
    variables: values,
  });

  const onSubmit = async (v: any, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    updateFaq({ variables: values });
  };

  useEffect(() => {
    setValues({
      id: data?.id?.length ? data?.id : "",
      title: data?.title?.length ? data?.title : "",
      body: data?.body?.length ? data?.body : "",
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
        Update FAQ
        <IconButton onClick={onClose} disabled={isLoading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="faq-edit-form"
        >
          <Controller
            name="title"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                error={!!errors.title}
                helperText={errors.title && errors.title.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, title: e.target.value });
                }}
                value={values?.title}
              />
            )}
          />
          <Controller
            name="body"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                multiline
                rows={4}
                maxRows={4}
                id="body"
                label="Body"
                name="body"
                autoComplete="body"
                error={!!errors.body}
                helperText={errors.body && errors.body.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, body: e.target.value });
                }}
                value={values?.body}
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
            form="faq-edit-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FaqEditModal;
