import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui';
import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderid: process.env.REACT_APP_MSGID,
  appId: process.env.REACT_APP_APID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
firebase.initializeApp(config);
firebase.analytics();

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/signedIn',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]
};

class Auth extends Component {
  render() {
    return (
      <div>
        <p>please sign-in</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
}

export default Auth;
