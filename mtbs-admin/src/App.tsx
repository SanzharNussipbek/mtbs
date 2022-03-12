import React, { lazy, Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Loader from "./components/loader/loader.component";
import { theme } from "./theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

const HomePage = lazy(() => import("./pages/home.component"));
const LoginPage = lazy(() => import("./pages/login.component"));

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Loader fullscreen />}>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/admin" component={HomePage} />
            </Switch>
          </Suspense>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
