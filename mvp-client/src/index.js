import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import { Provider } from "react-redux";
/*import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import admin from 'firebase-admin';*/
//import { createStore, combineReducers } from "redux";
/*import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from "react-redux-firebase";*/
//import { ApolloProvider } from '@apollo/react-hooks';
//import { client } from './apollo';

/*const fbConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_BUCKET,
  messagingSenderid: process.env.REACT_APP_MSGID,
  appId: process.env.REACT_APP_APID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};*/

//react-redux-firebase config
/*const rrfConfig = {
  userProfile: "users"
};*/

//initialize firebase instance
//firebase.initializeApp(fbConfig);

//initialize cloud firestore
/*admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
const db = admin.firestore();*/

//add firebase to reducers
/*const rootReducer = combineReducers({
  firebase: firebaseReducer
});

//create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};*/

render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
