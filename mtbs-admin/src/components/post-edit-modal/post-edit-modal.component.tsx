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

import { Post } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { UPDATE_POST } from "../../utils/gql";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  data: Post | null;
  open: boolean;
  onClose: () => void;
};

const PostEditModal: React.FC<Props> = ({ data, open, onClose }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    id: data?.id?.length ? data?.id : "",
    title: data?.title?.length ? data?.title : "",
    body: data?.body?.length ? data?.body : "",
    author: data?.author?.length ? data?.author : "",
    imgUrl: data?.imgUrl?.length ? data?.imgUrl : "",
    sourceUrl: data?.sourceUrl?.length ? data?.sourceUrl : "",
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: values,
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    update(_, { data }) {
      setIsLoading(false);
      onClose();
      dispatch(
        openSnackbar({
          message: "Post updated successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      setIsLoading(false);
      dispatch(
        openSnackbar({
          message: "Error while updating the post. See the logs.",
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
    updatePost({ variables: values });
  };

  useEffect(() => {
    setValues({
      id: data?.id?.length ? data?.id : "",
      title: data?.title?.length ? data?.title : "",
      body: data?.body?.length ? data?.body : "",
      author: data?.author?.length ? data?.author : "",
      imgUrl: data?.imgUrl?.length ? data?.imgUrl : "",
      sourceUrl: data?.sourceUrl?.length ? data?.sourceUrl : "",
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
        Create Post
        <IconButton onClick={onClose} disabled={isLoading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="post-edit-form"
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
          <Controller
            name="author"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="author"
                label="Author"
                name="author"
                autoComplete="author"
                error={!!errors.author}
                helperText={errors.author && errors.author.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, author: e.target.value });
                }}
                value={values?.author}
              />
            )}
          />
          <Controller
            name="imgUrl"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="imgUrl"
                type="url"
                label="Poster URL"
                name="imgUrl"
                autoComplete="imgUrl"
                error={!!errors.imgUrl}
                helperText={errors.imgUrl && errors.imgUrl.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, imgUrl: e.target.value });
                }}
                value={values?.imgUrl}
              />
            )}
          />
          <Controller
            name="sourceUrl"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="sourceUrl"
                type="url"
                label="Source URL"
                name="sourceUrl"
                autoComplete="sourceUrl"
                error={!!errors.sourceUrl}
                helperText={errors.sourceUrl && errors.sourceUrl.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, sourceUrl: e.target.value });
                }}
                value={values?.sourceUrl}
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
            form="post-edit-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditModal;
