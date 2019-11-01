import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import FileUpload from "./components/FileUpload";
import styled from "@emotion/styled";
import { rhythm } from "./utils/typography";
import { Background } from "react-imgix";
import firebase from 'firebase/app';


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
firebase.initializeApp(fbConfig);

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
      <Auth />
      <FileUpload />
    </Div>
  );
}

export default App;
