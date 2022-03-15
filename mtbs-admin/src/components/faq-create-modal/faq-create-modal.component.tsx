import React from "react";
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
import { CREATE_FAQ } from "../../utils/gql/faq";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateCallback: () => void;
};

const FaqCreateModal: React.FC<Props> = ({
  open,
  onClose,
  onCreateCallback,
}) => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    title: "",
    body: "",
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [createFaq, { called, loading }] = useMutation(CREATE_FAQ, {
    update(_, { data: { createFaq: faqData } }) {
      onCreateCallback();
      onClose();
      dispatch(
        openSnackbar({
          message: "FAQ created successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while creating the FAQ. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
      // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: defaultValues,
  });

  const onSubmit = async (values: any, e: any) => {
    e.preventDefault();
    console.log(values);
    createFaq({ variables: values });
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
        Create Post
        <IconButton onClick={onClose} disabled={loading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="faq-create-form"
        >
          <Controller
            name="title"
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
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                error={!!errors.title}
                helperText={errors.title && errors.title.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="body"
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
                multiline
                rows={4}
                maxRows={4}
                id="body"
                label="Body"
                name="body"
                autoComplete="body"
                error={!!errors.body}
                helperText={errors.body && errors.body.message}
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
            disabled={called && loading}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            size="large"
            pending={called && loading}
            form="faq-create-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FaqCreateModal;
