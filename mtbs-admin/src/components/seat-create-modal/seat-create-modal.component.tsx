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
import { useMutation, useQuery } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";

import { Hall } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { CREATE_SEAT } from "../../utils/gql/seat";
import { GET_ALL_HALLS } from "../../utils/gql/hall";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateCallback: () => void;
};

const SeatCreateModal: React.FC<Props> = ({
  open,
  onClose,
  onCreateCallback,
}) => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    seatNumber: 0,
    rowNumber: 0,
    hallId: "",
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedHallInputValue, setSelectedHallInputValue] = useState("");

  const { data: hallsData, loading: isHallsLoading } = useQuery(GET_ALL_HALLS, {
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while fetching halls list. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
  });

  const [createSeat] = useMutation(CREATE_SEAT, {
    update(_, { data: { createSeat: seatData } }) {
      setIsLoading(false);
      onCreateCallback();
      onClose();
      dispatch(
        openSnackbar({
          message: "Seat created successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      setIsLoading(false);
      dispatch(
        openSnackbar({
          message: "Error while creating the seat. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
    variables: defaultValues,
  });

  const onSubmit = async (values: any, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      seatNumber: +values?.seatNumber,
      rowNumber: +values?.rowNumber,
      hallId: halls.find((h) => h.name === values?.hallId)?.id ?? "",
    };
    createSeat({ variables: data });
  };

  useEffect(() => {
    setHalls(hallsData.getAllHalls);
  }, [hallsData]);

  return (
    <Dialog open={open}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Create Seat
        <IconButton onClick={onClose} disabled={isLoading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ width: 400 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="seat-create-form"
        >
          <Controller
            name="seatNumber"
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
                type="number"
                id="seatNumber"
                name="seatNumber"
                label="Seat number"
                autoComplete="seatNumber"
                autoFocus
                error={!!errors.seatNumber}
                helperText={errors.seatNumber && errors.seatNumber.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="rowNumber"
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
                type="number"
                id="rowNumber"
                name="rowNumber"
                label="Row number"
                autoComplete="rowNumber"
                error={!!errors.rowNumber}
                helperText={errors.rowNumber && errors.rowNumber.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="hallId"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <Autocomplete
                {...props}
                fullWidth
                loading={isHallsLoading}
                value={selectedHall}
                onChange={(event: any, newValue: string | null) => {
                  setSelectedHall(newValue);
                  props?.field?.onChange(newValue);
                }}
                inputValue={selectedHallInputValue}
                onInputChange={(event, newInputValue) => {
                  setSelectedHallInputValue(newInputValue);
                }}
                options={halls.map((h) => h.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Hall"
                    margin="normal"
                    error={!!errors.hallId}
                    helperText={errors.hallId && errors.hallId.message}
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
            form="seat-create-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SeatCreateModal;
