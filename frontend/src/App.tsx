import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home.component";
import Navigation from "./components/shared/Navigation/Navigation.component";
import Register from "./pages/Register/Register.component";
import Login from "./pages/Login/Login.component";
import Auth from "./pages/Auth/Auth.component";

const isAuth = true;

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/auth">
          <Auth />
        </GuestRoute>
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...other }: any) => {
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

// const GuestRoute = ({ children, ...rest }: any) => {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         isAuth ? (
//           <Redirect
//             to={{
//               pathname: "/rooms",
//               state: { from: location },
//             }}
//           />
//         ) : (
//           children
//         );
//       }}
//     ></Route>
//   );
// };

export default App;
