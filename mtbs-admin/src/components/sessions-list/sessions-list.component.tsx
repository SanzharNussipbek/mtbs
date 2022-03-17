import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { Session } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { Column, Row } from "../table/table.types";
import useModalState from "../../utils/useModalState";
import { openSnackbar } from "../../redux/loading/loading.slice";
import { DELETE_SESSION, GET_ALL_SESSIONS } from "../../utils/gql";
import { updateSessionList } from "../../redux/session/session.actions";

import Table from "../table/table.component";
import Loader from "../loader/loader.component";
import Dialog from "../dialog/dialog.component";
import SessionEditModal from "../session-edit-modal/session-edit-modal.component";
import SessionCreateModal from "../session-create-modal/session-create-modal.component";

import { Styled } from "./sessions-list.styles";

const columns: Column[] = [
  { title: "ID", field: "id" },
  { title: "Movie", field: "movie" },
  { title: "Hall", field: "hall" },
  { title: "Date", field: "date" },
  { title: "Time", field: "time" },
  { title: "Number of seats", field: "seats" },
  { title: "Rates", field: "rates" },
  { title: "Actions", field: "actions" },
];

const SessionsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [sessionId, setSessionId] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const { isOpen: isCreateOpen, onToggle: toggleCreate } = useModalState();
  const { isOpen: isEditOpen, onToggle: toggleEdit } = useModalState();
  const { isOpen: isDeleteOpen, onToggle: toggleDelete } = useModalState();

  const { called, loading, error, refetch } = useQuery(GET_ALL_SESSIONS, {
    onCompleted(data) {
      setSessions(data.getAllSessions);
      dispatch(updateSessionList(data.getAllSessions));
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

  const [deleteSession, { called: isDeleteCalled, loading: isDeleteLoading }] =
    useMutation(DELETE_SESSION, {
      update(_, { data }) {
        refetch();
        setSessionId("");
        dispatch(
          openSnackbar({
            message: "Session deleted successfully!",
            severity: "success",
          })
        );
      },
      onError(err) {
        dispatch(
          openSnackbar({
            message: "Error while deleting the session. See the logs.",
            severity: "error",
          })
        );
        console.error(JSON.stringify(err, null, 2));
        // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: sessionId },
    });

  useEffect(() => {
    setRows(
      sessions.map((session) => {
        return {
          ...session,
          movie: session?.movie?.name,
          hall: session?.hall?.name,
          seats: session.seats?.length,
          date: format(new Date(session?.datetime * 1000), "dd.MM.yyyy"),
          time: format(new Date(session?.datetime * 1000), "HH:mm"),
          rates: (
            <Box display="flex" flexDirection="column">
              <Typography>
                {`ADULT: ${
                  session.rates.ADULT && session.rates.ADULT !== 0
                    ? "$" + session.rates.ADULT
                    : "None"
                }`}
              </Typography>
              <Typography>
                {`STUDENT: ${
                  session.rates.STUDENT && session.rates.STUDENT !== 0
                    ? "$" + session.rates.STUDENT
                    : "None"
                }`}
              </Typography>
              <Typography>
                {`CHILD: ${
                  session.rates.CHILD && session.rates.CHILD !== 0
                    ? "$" + session.rates.CHILD
                    : "None"
                }`}
              </Typography>
            </Box>
          ),
          actions: (
            <ButtonGroup>
              <IconButton
                color="warning"
                onClick={() => handleEditSession(session)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteSession(session?.id)}
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
          ),
        };
      })
    );
  }, [sessions]);

  const handleEditSession = (session: Session) => {
    setSelectedSession(session);
    toggleEdit();
  };

  const handleDeleteSession = (id: string) => {
    setSessionId(id);
    toggleDelete();
  };

  const handleDeleteSubmit = () => {
    toggleDelete();
    deleteSession({ variables: { id: sessionId } });
  };

  const onCreateSession = () => {
    refetch();
  };

  return (called && loading) || (isDeleteCalled && isDeleteLoading) ? (
    <Loader fullscreen />
  ) : error ? (
    <Alert severity="error">{error?.message}</Alert>
  ) : (
    <Styled.Container>
      <Box display={"flex"} justifyContent="space-between">
        <Typography variant="h5" color="primary">
          Sessions
        </Typography>
        <Button color="info" variant="contained" onClick={toggleCreate}>
          Create
        </Button>
      </Box>
      <Table columns={columns} rows={rows} />
      <Dialog
        open={isDeleteOpen}
        confirmText="Delete"
        title="Delete Session"
        description="Are you sure you want to delete this session?"
        onClose={toggleDelete}
        onSubmit={handleDeleteSubmit}
        pending={false}
      />
      <SessionCreateModal
        open={isCreateOpen}
        onClose={toggleCreate}
        onCreateCallback={onCreateSession}
      />
      <SessionEditModal
        data={selectedSession}
        open={isEditOpen}
        onClose={toggleEdit}
      />
    </Styled.Container>
  );
};

export default SessionsList;
