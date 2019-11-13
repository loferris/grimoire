import React from "react";
import styled from "@emotion/styled";
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

const Ul = styled.ul`
  list-style: none;
  padding: 20px;
  font-weight: bold;
`;

const Div = styled.div`
  display: flex;
`;

const PageRouter = () => {
  return (
    <Router>
      <Div>
        <Ul>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              discover
            </Link>
          </li>
          <li>
            <Link to="/home" style={{ textDecoration: "none" }}>
              hearth
            </Link>
          </li>
          <li>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              enter
            </Link>
          </li>
          <li>
            <Link to="/account" style={{ textDecoration: "none" }}>
              book of shadows
            </Link>
          </li>
        </Ul>

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
      </Div>
    </Router>
  );
};

export default PageRouter;
