import React, { lazy, useEffect } from "react";
import { Box } from "@mui/material";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import useModalState from "../utils/useModalState";

import TopBar from "../components/topbar/topbar.component";
import Sidebar from "../components/sidebar/sidebarcomponent";

const UsersView = lazy(() => import("../components/users-view/users-view.component"));
const MoviesView = lazy(() => import("../components/movies-view/movies-view.component"));
const SeatsView = lazy(() => import("../components/seats-view/seats-view.component"));
const SessionsView = lazy(() => import( "../components/sessions-view/sessions-view.component"));
const HallsView = lazy(() => import("../components/halls-view/halls-view.component"));
const TicketsView = lazy(() => import("../components/tickets-view/tickets-view.component"));
const PostsView = lazy(() => import("../components/posts-view/posts-view.component"));
const FaqView = lazy(() => import("../components/faq-view/faq-view.component"));

const Home = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { isOpen, onToggle } = useModalState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/");
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar isOpen={isOpen} onToggle={onToggle} />
      <Sidebar isOpen={isOpen} onToggle={onToggle} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
        style={{
          transform: "translateY(64px)",
        }}
      >
        <Switch>
          <Route exact path={`${match.path}`} component={UsersView} />
          <Route path={`${match.path}/movies`} component={MoviesView} />
          <Route path={`${match.path}/sessions`} component={SessionsView} />
          <Route path={`${match.path}/seats`} component={SeatsView} />
          <Route path={`${match.path}/halls`} component={HallsView} />
          <Route path={`${match.path}/tickets`} component={TicketsView} />
          <Route path={`${match.path}/posts`} component={PostsView} />
          <Route path={`${match.path}/faq`} component={FaqView} />
        </Switch>
        {/* <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        </Container> */}
      </Box>
    </Box>
  );
};

export default Home;
