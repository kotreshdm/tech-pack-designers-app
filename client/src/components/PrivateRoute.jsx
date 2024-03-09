import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { currentUser } = useSelector((store) => store.user);
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={`/sign-in?returnUrl=${location.pathname}`} />
  );
}

export default PrivateRoute;
