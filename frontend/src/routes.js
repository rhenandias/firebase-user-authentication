import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PasswordReset from "./pages/PasswordReset";
import TestPage from "./pages/TestPage";

import ScrollToTop from "./components/ScrollToTop";

function AuthRoute({ showWhenAuth, component: Component, redirect, ...rest }) {
  const isAuthenticated = () => {
    for (let key in localStorage) {
      if (key.startsWith("localStorageUser")) {
        return true;
      }
    }
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() === showWhenAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            exact
            to={{ pathname: redirect, state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <AuthRoute
          exact
          path="/"
          component={Login}
          showWhenAuth={false}
          redirect={"/profile"}
        />
        <AuthRoute
          path="/profile"
          component={Profile}
          showWhenAuth={true}
          redirect={"/"}
        />
        <AuthRoute
          path="/register"
          component={Register}
          showWhenAuth={false}
          redirect={"/profile"}
        />
        <AuthRoute
          path="/reset"
          component={PasswordReset}
          showWhenAuth={false}
          redirect={"/profile"}
        />
        <Route path="/test" component={TestPage} />
      </Switch>
    </BrowserRouter>
  );
}
