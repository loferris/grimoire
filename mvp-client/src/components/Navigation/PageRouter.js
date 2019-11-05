import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../../constants/routes";

const SubRoutes = route => {
  return (
    <Route
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
};

const PageRouter = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <SubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
};

export default PageRouter;
