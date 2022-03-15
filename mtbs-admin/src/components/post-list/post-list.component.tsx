import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Link,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { Post } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { Column, Row } from "../table/table.types";
import useModalState from "../../utils/useModalState";
import { setPostList } from "../../redux/post/post.actions";
import { DELETE_POST, GET_ALL_POSTS } from "../../utils/gql/post";
import { openSnackbar } from "../../redux/loading/loading.slice";

import Table from "../table/table.component";
import Loader from "../loader/loader.component";
import Dialog from "../dialog/dialog.component";
import PostEditModal from "../post-edit-modal/post-edit-modal.component";
import PostCreateModal from "../post-create-modal/post-create-modal.component";

import { Styled } from "./post-list.styles";

const columns: Column[] = [
  { title: "ID", field: "id" },
  { title: "Title", field: "title", width: 300 },
  { title: "Body", field: "body", width: 500 },
  { title: "Author", field: "author" },
  { title: "Poster URL", field: "imgUrl" },
  { title: "Source", field: "sourceUrl" },
  { title: "Created at", field: "createdAt" },
  { title: "Actions", field: "actions" },
];

const PostList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [postId, setPostId] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { isOpen: isCreateOpen, onToggle: toggleCreate } = useModalState();
  const { isOpen: isEditOpen, onToggle: toggleEdit } = useModalState();
  const { isOpen: isDeleteOpen, onToggle: toggleDelete } = useModalState();

  const { called, loading, error, data, refetch } = useQuery(GET_ALL_POSTS, {
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while fetching posts list. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
  });

  const [deletePost, { called: isDeleteCalled, loading: isDeleteLoading }] =
    useMutation(DELETE_POST, {
      update(_, { data }) {
        refetch();
        setPostId("");
        dispatch(
          openSnackbar({
            message: "Post deleted successfully!",
            severity: "success",
          })
        );
      },
      onError(err) {
        dispatch(
          openSnackbar({
            message: "Error while deleting the post. See the logs.",
            severity: "error",
          })
        );
        console.error(JSON.stringify(err, null, 2));
        // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: postId },
    });

  useEffect(() => {
    if (!data) return;
    setPosts(data.getPosts);
    dispatch(setPostList(data.getPosts));
  }, [data]);

  useEffect(() => {
    setRows(
      posts.map((post) => {
        return {
          ...post,
          createdAt: format(new Date(post?.createdAt), "dd.MM.yyyy, HH:mm:ss"),
          body: <Box maxHeight={100} overflow="auto" >{post.body}</Box>,
          imgUrl: (
            <Link href={post.imgUrl} target="_blank">
              Link to poster
            </Link>
          ),
          sourceUrl: (
            <Link href={post.sourceUrl} target="_blank">
              Link to source
            </Link>
          ),
          actions: (
            <ButtonGroup>
              <IconButton color="warning" onClick={() => handleEditPost(post)}>
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeletePost(post?.id)}
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
          ),
        };
      })
    );
  }, [posts]);

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    toggleEdit();
  };

  const handleDeletePost = (id: string) => {
    setPostId(id);
    toggleDelete();
  };

  const handleDeleteSubmit = () => {
    toggleDelete();
    deletePost({ variables: { id: postId } });
  };

  const onCreatePost = () => {
    refetch();
  };

  return (called && loading) || (isDeleteCalled && isDeleteLoading) ? (
    <Loader fullscreen/>
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
        title="Delete Post"
        description="Are you sure you want to delete this post?"
        onClose={toggleDelete}
        onSubmit={handleDeleteSubmit}
        pending={false}
      />
      <PostCreateModal
        open={isCreateOpen}
        onClose={toggleCreate}
        onCreateCallback={onCreatePost}
      />
      <PostEditModal
        data={selectedPost}
        open={isEditOpen}
        onClose={toggleEdit}
      />
    </Styled.Container>
  );
};

export default PostList;
