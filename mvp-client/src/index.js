import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import FirebaseContextProvider from "./utils/firebase";
import ApolloContextProvider from "./utils/apollo";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <FirebaseContextProvider>
    <ApolloContextProvider>
      <App />
    </ApolloContextProvider>
  </FirebaseContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
