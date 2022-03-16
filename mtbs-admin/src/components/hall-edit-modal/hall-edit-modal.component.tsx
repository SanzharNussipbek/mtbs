import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  TextField,
  Box,
  Autocomplete,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";

import { Hall, HallType } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { UPDATE_HALL } from "../../utils/gql/hall";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

const HALL_TYPES: HallType[] = ["Standard", "VIP", "IMAX", "Green"];

type Props = {
  data: Hall | null;
  open: boolean;
  onClose: () => void;
};

const HallEditModal: React.FC<Props> = ({ data, open, onClose }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTypeInputValue, setSelectedTypeInputValue] = useState("");
  const [values, setValues] = useState({
    id: data?.id?.length ? data?.id : "",
    name: data?.name?.length ? data?.name : "",
    type: data?.type?.length ? data?.type : "",
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: values,
  });

  const [updateHall, { called, loading }] = useMutation(UPDATE_HALL, {
    update(_, { data }) {
      setIsLoading(false);
      onClose();
      dispatch(
        openSnackbar({
          message: "Hall updated successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while updating the Hall. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
      // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: values,
  });

  const onSubmit = async (v: any, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    updateHall({ variables: values });
  };

  useEffect(() => {
    setValues({
      id: data?.id?.length ? data?.id : "",
      name: data?.name?.length ? data?.name : "",
      type: data?.type?.length ? data?.type : "",
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
        Update HALL
        <IconButton onClick={onClose} disabled={loading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ width: 400 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="hall-edit-form"
        >
          <Controller
            name="name"
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
                id="name"
                label="Title"
                name="name"
                autoComplete="name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, name: e.target.value });
                }}
                value={values?.name}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <Autocomplete
                {...props}
                fullWidth
                value={values?.type}
                onChange={(event: any, newValue: string | null) => {
                  props?.field?.onChange(newValue);
                  setValues({ ...values, type: newValue as HallType });
                }}
                inputValue={selectedTypeInputValue}
                onInputChange={(event, newInputValue) => {
                  setSelectedTypeInputValue(newInputValue);
                }}
                options={HALL_TYPES}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type"
                    margin="normal"
                    error={!!errors.type}
                    helperText={errors.type && errors.type.message}
                  />
                )}
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
            form="hall-edit-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default HallEditModal;
