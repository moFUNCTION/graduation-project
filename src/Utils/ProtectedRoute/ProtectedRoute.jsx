import React from "react";
import { UseUserData } from "../../Context/UserContext/UserContextProvider";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({
  children,
  in_invalid_navigate_to = "/login",
  message = "please login to continue",
}) => {
  const { user } = UseUserData();
  if (user) {
    return children;
  } else {
    return <Navigate to={in_invalid_navigate_to} state={{ message }} />;
  }
};
