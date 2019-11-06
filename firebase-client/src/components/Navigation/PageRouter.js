import React from "react";
import { Switch, Route } from "react-router-dom";

const routes = [
  {
    path: "/"
  },
  {
    path: "/signup"
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
    path: "/pw-forget"
  }
];

const PageRouter = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} exact={route.exact} />
      ))}
    </Switch>
  );
};

export default PageRouter;
