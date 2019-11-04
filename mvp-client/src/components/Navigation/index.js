import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageRouter from "./PageRouter";
import NavBar from "./NavBar";

const Navigation = () => (
  <Router>
    <div>
      <NavBar />
      <PageRouter />
    </div>
  </Router>
);

export default Navigation;
