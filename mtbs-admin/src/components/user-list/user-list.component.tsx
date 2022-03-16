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

import { User } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { Column, Row } from "../table/table.types";
import useModalState from "../../utils/useModalState";
import { setUserList } from "../../redux/user/user.actions";
import { DELETE_USER, GET_ALL_USERS } from "../../utils/gql/user";
import { openSnackbar } from "../../redux/loading/loading.slice";

import Table from "../table/table.component";
import Loader from "../loader/loader.component";
import Dialog from "../dialog/dialog.component";
import UserEditModal from "../user-edit-modal/user-edit-modal.component";
import UserCreateModal from "../user-create-modal/user-create-modal.component";

import { Styled } from "./user-list.styles";

const columns: Column[] = [
  { title: "ID", field: "id" },
  { title: "Name", field: "name", width: 200 },
  { title: "Email", field: "email" },
  { title: "Phone", field: "phone" },
  { title: "Status", field: "status" },
  { title: "Ticket IDs", field: "tickets", width: 300 },
  { title: "Created at", field: "createdAt" },
  { title: "Actions", field: "actions" },
];

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const admin = JSON.parse(localStorage.getItem("user") ?? "");

  const [userId, setUserId] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { isOpen: isCreateOpen, onToggle: toggleCreate } = useModalState();
  const { isOpen: isEditOpen, onToggle: toggleEdit } = useModalState();
  const { isOpen: isDeleteOpen, onToggle: toggleDelete } = useModalState();

  const { called, loading, error, data, refetch } = useQuery(GET_ALL_USERS, {
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while fetching users list. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
  });

  const [deleteUser, { called: isDeleteCalled, loading: isDeleteLoading }] =
    useMutation(DELETE_USER, {
      update(_, { data }) {
        refetch();
        setUserId("");
        dispatch(
          openSnackbar({
            message: "User deleted successfully!",
            severity: "success",
          })
        );
      },
      onError(err) {
        dispatch(
          openSnackbar({
            message: "Error while deleting the user. See the logs.",
            severity: "error",
          })
        );
        console.error(JSON.stringify(err, null, 2));
        // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: userId },
    });

  useEffect(() => {
    if (!data) return;
    setUsers(data.getAllUsers);
    dispatch(setUserList(data.getAllUsers));
  }, [data]);

  useEffect(() => {
    setRows(
      users.map((user) => {
        return {
          ...user,
          name: `${user?.firstname} ${user?.lastname}`,
          tickets: user?.tickets?.join(", "),
          createdAt: format(new Date(user?.createdAt), "dd.MM.yyyy, HH:mm:ss"),
          actions: (
            <ButtonGroup>
              <IconButton
                color="warning"
                disabled={user?.id === admin?.id}
                onClick={() => handleEditUser(user)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                disabled={user?.id === admin?.id}
                onClick={() => handleDeleteUser(user?.id)}
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
          ),
        };
      })
    );
  }, [users]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    toggleEdit();
  };

  const handleDeleteUser = (id: string) => {
    setUserId(id);
    toggleDelete();
  };

  const handleDeleteSubmit = () => {
    toggleDelete();
    deleteUser({ variables: { id: userId } });
  };

  const onCreateUser = () => {
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
          Users
        </Typography>
        <Button color="info" variant="contained" onClick={toggleCreate}>
          Create
        </Button>
      </Box>
      <Table columns={columns} rows={rows} />
      <Dialog
        open={isDeleteOpen}
        confirmText="Delete"
        title="Delete User"
        description="Are you sure you want to delete this user?"
        onClose={toggleDelete}
        onSubmit={handleDeleteSubmit}
        pending={false}
      />
      <UserCreateModal
        open={isCreateOpen}
        onClose={toggleCreate}
        onCreateCallback={onCreateUser}
      />
      <UserEditModal
        data={selectedUser}
        open={isEditOpen}
        onClose={toggleEdit}
      />
    </Styled.Container>
  );
};

export default UserList;
