import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { useAppDispatch } from "../../hooks";
import { Hall, Seat } from "../../types/types";
import { Column, Row } from "../table/table.types";
import useModalState from "../../utils/useModalState";
import { setSeatList } from "../../redux/seat/seat.actions";
import { openSnackbar } from "../../redux/loading/loading.slice";
import { DELETE_SEAT, GET_ALL_SEATS, GET_ALL_HALLS } from "../../utils/gql";

import Table from "../table/table.component";
import Loader from "../loader/loader.component";
import Dialog from "../dialog/dialog.component";
import SeatCreateModal from "../seat-create-modal/seat-create-modal.component";

import { Styled } from "./seats-list.styles";

const columns: Column[] = [
  { title: "ID", field: "id" },
  { title: "Seat number", field: "seatNumber" },
  { title: "Row number", field: "rowNumber" },
  { title: "Hall", field: "hallId" },
  { title: "Actions", field: "actions" },
];

const SeatsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [seatId, setSeatId] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);

  const { isOpen: isCreateOpen, onToggle: toggleCreate } = useModalState();
  const { isOpen: isDeleteOpen, onToggle: toggleDelete } = useModalState();

  const { called, loading, error, refetch } = useQuery(GET_ALL_SEATS, {
    onCompleted(data) {
      setSeats(data.getAllSeats);
      dispatch(setSeatList(data.getAllSeats));
    },
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while fetching FAQ list. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
  });

  const {
    called: isHallCalled,
    loading: isHallLoading,
    data: hallData,
  } = useQuery(GET_ALL_HALLS, {
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while fetching hall list. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
  });

  const [deleteSeat, { called: isDeleteCalled, loading: isDeleteLoading }] =
    useMutation(DELETE_SEAT, {
      update(_, { data }) {
        refetch();
        setSeatId("");
        dispatch(
          openSnackbar({
            message: "Seat deleted successfully!",
            severity: "success",
          })
        );
      },
      onError(err) {
        dispatch(
          openSnackbar({
            message: "Error while deleting the seat. See the logs.",
            severity: "error",
          })
        );
        console.error(JSON.stringify(err, null, 2));
      },
      variables: { id: seatId },
    });

  useEffect(() => {
    if (!hallData) return;
    setHalls(hallData.getAllHalls);
  }, [hallData]);

  useEffect(() => {
    setRows(
      seats.map((seat) => {
        return {
          ...seat,
          hallId: halls.find((h) => h.id === seat.hallId)?.name,
          actions: (
            <ButtonGroup>
              <IconButton
                color="error"
                onClick={() => handleDeleteSeat(seat?.id)}
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
          ),
        };
      })
    );
  }, [seats, halls]);

  const handleDeleteSeat = (id: string) => {
    setSeatId(id);
    toggleDelete();
  };

  const handleDeleteSubmit = () => {
    toggleDelete();
    deleteSeat({ variables: { id: seatId } });
  };

  const onCreateSeat = () => {
    refetch();
  };

  return (called && loading) ||
    (isDeleteCalled && isDeleteLoading) ||
    (isHallCalled && isHallLoading) ? (
    <Loader fullscreen />
  ) : error ? (
    <Alert severity="error">{error?.message}</Alert>
  ) : (
    <Styled.Container>
      <Box display={"flex"} justifyContent="space-between">
        <Typography variant="h5" color="primary">
          Seats
        </Typography>
        <Button color="info" variant="contained" onClick={toggleCreate}>
          Create
        </Button>
      </Box>
      <Table columns={columns} rows={rows} />
      <Dialog
        open={isDeleteOpen}
        confirmText="Delete"
        title="Delete Seat"
        description="Are you sure you want to delete this seat?"
        onClose={toggleDelete}
        onSubmit={handleDeleteSubmit}
        pending={false}
      />
      <SeatCreateModal
        open={isCreateOpen}
        onClose={toggleCreate}
        onCreateCallback={onCreateSeat}
      />
    </Styled.Container>
  );
};

export default SeatsList;
