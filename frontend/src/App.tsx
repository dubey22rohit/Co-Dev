import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home.component";
import Navigation from "./components/shared/Navigation/Navigation.component";
import Auth from "./pages/Auth/Auth.component";
import Activate from "./pages/Activate/Activate.component";
import Rooms from "./pages/Rooms/Rooms.component";
import { useSelector } from "react-redux";
import useLoadingWithRefresh from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader.component";
import Room from "./pages/Room/Room.component";

function App() {
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message="Please wait..." />
  ) : (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/auth">
          <Auth />
        </GuestRoute>
        <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute>
        <ProtectedRoute path="/room/:id">
          <Room />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...other }: any) => {
  const { isAuth } = useSelector((state: any) => state.auth);
  return (
    <Route
      {...other}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

const SemiProtectedRoute = ({ children, ...rest }: any) => {
  const { user, isAuth } = useSelector((state: any) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
};

const ProtectedRoute = ({ children, ...rest }: any) => {
  const { user, isAuth } = useSelector((state: any) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          <Redirect
            to={{
              pathname: "/activate",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

export default App;
