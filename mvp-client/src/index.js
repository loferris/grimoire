import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//component imports
import App from "./App";
import FirebaseContextProvider from "./utils/firebase";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_HASURA_ENDPOINT
});

ReactDOM.render(
  <FirebaseContextProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </FirebaseContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
