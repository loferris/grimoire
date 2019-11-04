import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/signin">enter</Link>
      </li>
      <li>
        <Link to="/">discover</Link>
      </li>
      <li>
        <Link to="/home">hearth</Link>
      </li>
      <li>
        <Link to="/account">book of shadows</Link>
      </li>
      <li>
        <Link to="/admin">permissions</Link>
      </li>
    </ul>
  );
};

export default NavBar;
