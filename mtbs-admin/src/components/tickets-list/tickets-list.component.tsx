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
import { format } from "date-fns";
import { Delete, Edit } from "@mui/icons-material";

import { Ticket } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { Column, Row } from "../table/table.types";
import useModalState from "../../utils/useModalState";
import { openSnackbar } from "../../redux/loading/loading.slice";
import { DELETE_TICKET, GET_ALL_TICKETS } from "../../utils/gql/ticket";
import { setTicketList } from "../../redux/ticket/ticket.actions";

import Table from "../table/table.component";
import Loader from "../loader/loader.component";
import Dialog from "../dialog/dialog.component";

import { Styled } from "./tickets-list.styles";

const columns: Column[] = [
  { title: "ID", field: "id" },
  { title: "Session Date", field: "sessionDate" },
  { title: "Session Time", field: "sessionTime" },
  { title: "Session Hall", field: "sessionHall" },
  { title: "Session Movie", field: "sessionMovie" },
  { title: "User", field: "userId" },
  { title: "Price", field: "price" },
  { title: "Status", field: "status" },
  { title: "Seats", field: "seats" },
  { title: "Created at", field: "createdAt" },
  { title: "Actions", field: "actions" },
];

const TicketsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [ticketId, setTicketId] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const { isOpen: isCreateOpen, onToggle: toggleCreate } = useModalState();
  const { isOpen: isEditOpen, onToggle: toggleEdit } = useModalState();
  const { isOpen: isDeleteOpen, onToggle: toggleDelete } = useModalState();

  const { called, loading, error, data, refetch } = useQuery(GET_ALL_TICKETS, {
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while fetching ticket list. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
  });

  const [deleteTicket, { called: isDeleteCalled, loading: isDeleteLoading }] =
    useMutation(DELETE_TICKET, {
      update(_, { data }) {
        refetch();
        setTicketId("");
        dispatch(
          openSnackbar({
            message: "Ticket deleted successfully!",
            severity: "success",
          })
        );
      },
      onError(err) {
        dispatch(
          openSnackbar({
            message: "Error while deleting the ticket. See the logs.",
            severity: "error",
          })
        );
        console.error(JSON.stringify(err, null, 2));
        // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: ticketId },
    });

  useEffect(() => {
    if (!data) return;
    setTickets(data.getAllTickets);
    dispatch(setTicketList(data.getAllTickets));
  }, [data]);

  useEffect(() => {
    setRows(
      tickets.map((ticket) => {
        return {
          ...ticket,
          price: `$${ticket?.price}`,
          createdAt: format(
            new Date(ticket?.createdAt),
            "dd.MM.yyyy, HH:mm:ss"
          ),
          sessionDate: format(
            new Date(ticket?.session?.datetime * 1000),
            "dd.MM.yyyy"
          ),
          sessionTime: format(
            new Date(ticket?.session?.datetime * 1000),
            "HH:mm"
          ),
          sessionHall: ticket?.session?.hall?.name,
          sessionMovie: ticket?.session?.movie?.name,
          seats: (
            <Box display="flex" flexDirection="column">
              {ticket?.seats?.map((s) => (
                <Typography key={s.id} style={{ whiteSpace: 'nowrap' }}>
                  {`Seat: ${s.seat.seatNumber}, Row: ${s.seat.rowNumber}`}
                </Typography>
              ))}
            </Box>
          ),
          actions: (
            <ButtonGroup>
              <IconButton
                color="warning"
                onClick={() => handleEditTicket(ticket)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteTicket(ticket?.id)}
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
          ),
        };
      })
    );
  }, [tickets]);

  const handleEditTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    toggleEdit();
  };

  const handleDeleteTicket = (id: string) => {
    setTicketId(id);
    toggleDelete();
  };

  const handleDeleteSubmit = () => {
    toggleDelete();
    deleteTicket({ variables: { id: ticketId } });
  };

  const onCreateTicket = () => {
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
        title="Delete Ticket"
        description="Are you sure you want to delete this ticket?"
        onClose={toggleDelete}
        onSubmit={handleDeleteSubmit}
        pending={false}
      />
      {/* <FaqCreateModal
        open={isCreateOpen}
        onClose={toggleCreate}
        onCreateCallback={onCreateTicket}
      />
      <FaqEditModal
        data={selectedTicket}
        open={isEditOpen}
        onClose={toggleEdit}
      /> */}
    </Styled.Container>
  );
};

export default TicketsList;
