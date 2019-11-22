import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { client } from "../../utils/apollo";
import { USER_MUTATION } from "../../components/Mutation/UserSync";

const SignIn = () => {
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google as auth provider.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID
      //firebase.auth.EmailAuthProvider.credential(email, password)
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  const [isSignedIn, setSignIn] = useState(false);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setSignIn(!!user);
      console.log(user.uid); //test
      client.mutate({
        mutation: USER_MUTATION,
        variables: { objects: [{ fire_uid: user.uid }] }
      });
      //this component is currently calling the unique firebase uid from the user object created by the auth admin SDK
    });
  }, [isSignedIn]);

  // Make sure we un-register Firebase observers when the component unmounts.
  /*componentWillUnmount() {
    this.unregisterAuthObserver();
  }*/

  if (!isSignedIn) {
    return (
      <div>
        <h1>welcome</h1>
        <p>please sign in to create your own book of shadows</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
  return (
    <div>
      <p>
        Welcome {firebase.auth().currentUser.displayName}! You are now
        signed-in!
      </p>
      <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
    </div>
  );
};

export default SignIn;
