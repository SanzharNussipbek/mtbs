import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Alert, Box, Button, ButtonGroup, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { Hall } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { Column, Row } from "../table/table.types";
import useModalState from "../../utils/useModalState";
import { openSnackbar } from "../../redux/loading/loading.slice";
import { DELETE_HALL, GET_ALL_HALLS } from "../../utils/gql/hall";
import { setHallList } from "../../redux/hall/hall.actions";

import Table from "../table/table.component";
import Loader from "../loader/loader.component";
import Dialog from "../dialog/dialog.component";

import { Styled } from "./halls-list.styles";

const columns: Column[] = [
  { title: "ID", field: "id" },
  { title: "Name", field: "name" },
  { title: "Type", field: "type" },
  { title: "Number of seats", field: "seats" },
  { title: "Actions", field: "actions" },
];

const HallsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [hallId, setHallId] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);

  const { isOpen: isCreateOpen, onToggle: toggleCreate } = useModalState();
  const { isOpen: isEditOpen, onToggle: toggleEdit } = useModalState();
  const { isOpen: isDeleteOpen, onToggle: toggleDelete } = useModalState();

  const { called, loading, error, data, refetch } = useQuery(GET_ALL_HALLS, {
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

  const [deleteHall, { called: isDeleteCalled, loading: isDeleteLoading }] =
    useMutation(DELETE_HALL, {
      update(_, { data }) {
        refetch();
        setHallId("");
        dispatch(
          openSnackbar({
            message: "Hall deleted successfully!",
            severity: "success",
          })
        );
      },
      onError(err) {
        dispatch(
          openSnackbar({
            message: "Error while deleting the hall. See the logs.",
            severity: "error",
          })
        );
        console.error(JSON.stringify(err, null, 2));
        // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: hallId },
    });

  useEffect(() => {
    if (!data) return;
    setHalls(data.getAllHalls);
    dispatch(setHallList(data.getAllHalls));
  }, [data]);

  useEffect(() => {
    setRows(
      halls.map((hall) => {
        return {
          ...hall,
          seats: hall.seats?.length,
          actions: (
            <ButtonGroup>
              <IconButton color="warning" onClick={() => handleEditHall(hall)}>
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteHall(hall?.id)}
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
          ),
        };
      })
    );
  }, [halls]);

  const handleEditHall = (hall: Hall) => {
    setSelectedHall(hall);
    toggleEdit();
  };

  const handleDeleteHall = (id: string) => {
    setHallId(id);
    toggleDelete();
  };

  const handleDeleteSubmit = () => {
    toggleDelete();
    deleteHall({ variables: { id: hallId } });
  };

  const onCreateHall = () => {
    refetch();
  };

  return (called && loading) || (isDeleteCalled && isDeleteLoading) ? (
    <Loader fullscreen />
  ) : error ? (
    <Alert severity="error">{error?.message}</Alert>
  ) : (
    <Styled.Container>
      <Box display={"flex"} justifyContent="flex-end">
        <Button color="info" variant="contained" onClick={toggleCreate}>
          Create
        </Button>
      </Box>
      <Table columns={columns} rows={rows} />
      <Dialog
        open={isDeleteOpen}
        confirmText="Delete"
        title="Delete Hall"
        description="Are you sure you want to delete this hall?"
        onClose={toggleDelete}
        onSubmit={handleDeleteSubmit}
        pending={false}
      />
      {/* <FaqCreateModal
        open={isCreateOpen}
        onClose={toggleCreate}
        onCreateCallback={onCreateHall}
      />
      <FaqEditModal
        data={selectedHall}
        open={isEditOpen}
        onClose={toggleEdit}
      /> */}
    </Styled.Container>
  );
};

export default HallsList;
