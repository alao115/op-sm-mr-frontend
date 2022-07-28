import React from "react";
import { Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth((ctx) => ctx);

  return (
    <Route
      {...rest}
      children={(props) => {
        if (!isLoggedIn) {
          // not logged in so redirect to login page with the return url
          return props.location.pathname === "/authentication/Register" ? (
            <Component {...props} />
          ) : (
            <Navigate
              to="/authentication/login"
              state={{ from: props.location }}
            />
          );
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
