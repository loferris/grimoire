import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>enter</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>discover</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>hearth</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>book of shadows</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>permissions</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
