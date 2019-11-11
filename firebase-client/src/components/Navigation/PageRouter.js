import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import pages
import EnterPage from "../../views/UserAccess";
import UploadPage from "../../views/UserUploads";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => (
      <div>
        welcome to grimoire, a platform for mindfulness and self-expression
      </div>
    )
  },
  {
    path: "/signup",
    main: () => (
      <div>
        <EnterPage />
      </div>
    ),
    exact: false
  },
  {
    path: "/signin",
    exact: false
  },
  {
    path: "/home",
    exact: false
  },
  {
    path: "/account",
    main: () => (
      <div>
        <UploadPage />
      </div>
    ),
    exact: false
  }
];

const PageRouter = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">discover</Link>
          </li>
          <li>
            <Link to="/home">hearth</Link>
          </li>
          <li>
            <Link to="/signup">enter</Link>
          </li>
          <li>
            <Link to="/account">book of shadows</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={route.main}
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
};

export default PageRouter;
