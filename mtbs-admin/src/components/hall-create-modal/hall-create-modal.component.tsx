import React, { useState } from "react";
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

import { HallType } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { CREATE_HALL } from "../../utils/gql/hall";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

const HALL_TYPES: HallType[] = ["Standard", "VIP", "IMAX", "Green"];

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateCallback: () => void;
};

const HallCreateModal: React.FC<Props> = ({
  open,
  onClose,
  onCreateCallback,
}) => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    name: "",
    type: "",
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTypeInputValue, setSelectedTypeInputValue] = useState("");

  const [createHall] = useMutation(CREATE_HALL, {
    update(_, { data }) {
      setIsLoading(false);
      onCreateCallback();
      onClose();
      dispatch(
        openSnackbar({
          message: "Hall created successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      setIsLoading(false);
      dispatch(
        openSnackbar({
          message: "Error while creating the hall. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
    variables: {
      name: "",
      type: "",
      seatIds: [],
    },
  });

  const onSubmit = async (values: any, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    createHall({ variables: values });
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
        Create Hall
        <IconButton onClick={onClose} disabled={isLoading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ width: 400 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="hall-create-form"
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
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
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
                value={selectedType}
                onChange={(event: any, newValue: string | null) => {
                  setSelectedType(newValue);
                  props?.field?.onChange(newValue);
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
            form="hall-create-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default HallCreateModal;
