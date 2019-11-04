import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../../constants/routes";

const PageRouter = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
};

export default PageRouter;
