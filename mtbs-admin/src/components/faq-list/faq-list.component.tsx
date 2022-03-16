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
import { Delete, Edit } from "@mui/icons-material";

import { Faq } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { Column, Row } from "../table/table.types";
import useModalState from "../../utils/useModalState";
import { setFaqList } from "../../redux/faq/faq.actions";
import { DELETE_FAQ, GET_ALL_FAQ } from "../../utils/gql/faq";
import { openSnackbar } from "../../redux/loading/loading.slice";

import Table from "../table/table.component";
import Loader from "../loader/loader.component";
import Dialog from "../dialog/dialog.component";
import FaqEditModal from "../faq-edit-modal/faq-edit-modal.component";
import FaqCreateModal from "../faq-create-modal/faq-create-modal.component";

import { Styled } from "./faq-list.styles";

const columns: Column[] = [
  { title: "ID", field: "id" },
  { title: "Title", field: "title", width: 300 },
  { title: "Body", field: "body", width: 500 },
  { title: "Actions", field: "actions" },
];

const FaqList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [faqId, setFaqId] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);

  const { isOpen: isCreateOpen, onToggle: toggleCreate } = useModalState();
  const { isOpen: isEditOpen, onToggle: toggleEdit } = useModalState();
  const { isOpen: isDeleteOpen, onToggle: toggleDelete } = useModalState();

  const { called, loading, error, data, refetch } = useQuery(GET_ALL_FAQ, {
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

  const [deleteFaq, { called: isDeleteCalled, loading: isDeleteLoading }] =
    useMutation(DELETE_FAQ, {
      update(_, { data }) {
        refetch();
        setFaqId("");
        dispatch(
          openSnackbar({
            message: "FAQ deleted successfully!",
            severity: "success",
          })
        );
      },
      onError(err) {
        dispatch(
          openSnackbar({
            message: "Error while deleting the FAQ. See the logs.",
            severity: "error",
          })
        );
        console.error(JSON.stringify(err, null, 2));
        // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: faqId },
    });

  useEffect(() => {
    if (!data) return;
    setFaqs(data.getFaqs);
    dispatch(setFaqList(data.getFaqs));
  }, [data]);

  useEffect(() => {
    setRows(
      faqs.map((faq) => {
        return {
          ...faq,
          body: (
            <Box maxHeight={100} overflow="auto">
              {faq.body}
            </Box>
          ),
          actions: (
            <ButtonGroup>
              <IconButton color="warning" onClick={() => handleEditFaq(faq)}>
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteFaq(faq?.id)}
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
          ),
        };
      })
    );
  }, [faqs]);

  const handleEditFaq = (faq: Faq) => {
    setSelectedFaq(faq);
    toggleEdit();
  };

  const handleDeleteFaq = (id: string) => {
    setFaqId(id);
    toggleDelete();
  };

  const handleDeleteSubmit = () => {
    toggleDelete();
    deleteFaq({ variables: { id: faqId } });
  };

  const onCreateFaq = () => {
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
          FAQ
        </Typography>
        <Button color="info" variant="contained" onClick={toggleCreate}>
          Create
        </Button>
      </Box>
      {rows?.length ? (
        <Table columns={columns} rows={rows} />
      ) : (
        <Box display={"flex"} justifyContent="center">
          <Typography variant="h6" color="textPrimary">
            No FAQ right now
          </Typography>
        </Box>
      )}
      <Dialog
        open={isDeleteOpen}
        confirmText="Delete"
        title="Delete Faq"
        description="Are you sure you want to delete this faq?"
        onClose={toggleDelete}
        onSubmit={handleDeleteSubmit}
        pending={false}
      />
      <FaqCreateModal
        open={isCreateOpen}
        onClose={toggleCreate}
        onCreateCallback={onCreateFaq}
      />
      <FaqEditModal data={selectedFaq} open={isEditOpen} onClose={toggleEdit} />
    </Styled.Container>
  );
};

export default FaqList;
