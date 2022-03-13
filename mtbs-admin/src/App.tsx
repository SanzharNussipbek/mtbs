import React, { lazy, Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Loader from "./components/loader/loader.component";
import { theme } from "./theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const HomePage = lazy(() => import("./pages/home.component"));
const LoginPage = lazy(() => import("./pages/login.component"));

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
