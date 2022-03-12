import React, { lazy, Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Loader from "./components/loader/loader.component";
import { theme } from "./theme";

const HomePage = lazy(() => import("./pages/home.component"));
const LoginPage = lazy(() => import("./pages/login.component"));

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loader fullscreen />}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/admin" component={HomePage} />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;