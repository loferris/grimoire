import React from "react";
import SignUpPage from "../pages/SignUp";

const routes = [
  {
    path: "/"
  },
  {
    path: "/signup",
    component: <SignUpPage />
  },
  {
    path: "/signin"
  },
  {
    path: "/home"
  },
  {
    path: "/account"
  },
  {
    path: "/admin"
  },
  {
    path: "/pw-forget"
  }
];

export default routes;
