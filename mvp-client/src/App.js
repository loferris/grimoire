//node packages
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//component features
//import Auth from "./components/Auth";
//import FileUpload from "./components/FileUpload";

//pages of app
import Navigation from "./pages/Navigation";
import LandingPage from "./pages/Landing";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import PasswordForgetPage from "./pages/PasswordForget";
import HomePage from "./pages/Home";
import AccountPage from "./pages/Account";
import AdminPage from "./pages/Admin";

import * as ROUTES from "./constants/routes";

//styling
import styled from "@emotion/styled";
import { rhythm } from "./utils/typography";
import { Background } from "react-imgix";

/*import firebase from "firebase/app";

const fbConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_BUCKET,
  messagingSenderid: process.env.REACT_APP_MSGID,
  appId: process.env.REACT_APP_APID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

//initialize firebase instance
firebase.initializeApp(fbConfig);*/

const Div = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding: ${rhythm(2)};
  padding-top: ${rhythm(1.5)};
  background-color: lavenderblush;
  color: purple;
`;

const H3 = styled.h3`
  margin-bottom: ${rhythm(2)};
  display: inline-block;
  font-style: bold;
  color: white;
  background-color: red;
`;

function App() {
  return (
    <Div>
      <Background
        src="http://grimoire.imgix.net/lupines-jenner.jpeg"
        imgixParams={{
          auto: "enhance",
          sat: 50,
          con: 25,
          fit: "crop",
          crop: "focalpoint"
        }}
      >
        <H3>grimoire</H3>
      </Background>
      <div>
        <Router>
          <Navigation />
          {/*
  <hr />
  <Route exact path={ROUTES.LANDING} component={LandingPage} />
  <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
  <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
  <Route
    exact
    path={ROUTES.PASSWORD_FORGET}
    component={PasswordForgetPage}
  />
  <Route exact path={ROUTES.HOME} component={HomePage} />
  <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
  <Route exact path={ROUTES.ADMIN} component={AdminPage} />
*/}
        </Router>
      </div>
    </Div>
  );
}

export default App;
