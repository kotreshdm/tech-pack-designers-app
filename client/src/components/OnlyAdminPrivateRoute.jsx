import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Constants from "../utils/Constants";

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((store) => store.user);
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={Constants.Navagation.signIn} />
  );
}
