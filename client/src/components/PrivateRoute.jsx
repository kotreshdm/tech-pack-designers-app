import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Constants from "../utils/Constants";

function PrivateRoute() {
  const { currentUser } = useSelector((store) => store.user);
  // console.log(location.href.slice());
  let rtnUrl = "";
  if (location.pathname) {
    rtnUrl = Constants.Navagation.signIn + "?returnUrl=" + location.pathname;
  } else {
    rtnUrl = Constants.Navagation.signIn;
  }

  console.log(rtnUrl);
  return currentUser ? <Outlet /> : <Navigate to={rtnUrl} />;
}

export default PrivateRoute;
