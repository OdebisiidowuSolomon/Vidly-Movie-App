import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { toast } from "react-toastify";
import authService from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  let jwt = "";
  try {
    jwt = localStorage.getItem("token");
    console.log(jwtDecode(localStorage.getItem("token")));
  } catch (error) {
    toast.info("You Need To Login first");
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!jwt)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
