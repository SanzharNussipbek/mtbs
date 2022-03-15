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
import { CREATE_POST } from "../../utils/gql/post";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateCallback: () => void;
};

const PostCreateModal: React.FC<Props> = ({
  open,
  onClose,
  onCreateCallback,
}) => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    title: "",
    body: "",
    author: "",
    imgUrl: "",
    sourceUrl: "",
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [createPost, { called, loading }] = useMutation(CREATE_POST, {
    update(_, { data: { createPost: postData } }) {
      onCreateCallback();
      onClose();
      dispatch(
        openSnackbar({
          message: "Post created successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while creating the post. See the logs.",
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
    createPost({ variables: values });
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
          id="post-create-form"
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
          <Controller
            name="author"
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
                id="author"
                label="Author"
                name="author"
                autoComplete="author"
                error={!!errors.author}
                helperText={errors.author && errors.author.message}
                onChange={(value) => {
                  props.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="imgUrl"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="imgUrl"
                type="url"
                label="Poster URL"
                name="imgUrl"
                autoComplete="imgUrl"
                error={!!errors.imgUrl}
                helperText={errors.imgUrl && errors.imgUrl.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="sourceUrl"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="sourceUrl"
                type="url"
                label="Source URL"
                name="sourceUrl"
                autoComplete="sourceUrl"
                error={!!errors.sourceUrl}
                helperText={errors.sourceUrl && errors.sourceUrl.message}
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
            form="post-create-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreateModal;
