import React, { Component } from "react";
//import styled from "@emotion/styled";
//import { rhythm } from "../../utils/typography";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { client } from "../../index.js";
import { USER_MUTATION } from "../../components/Mutation/UserSync";

class SignIn extends Component {
  state = {
    isSignedIn: false, // Local signed-in state.
    uid: "test"
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
      //firebase.auth.EmailAuthProvider.credential(email, password)
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      this.setState({ uid: user.uid });
      console.log(this.state.uid); //test
      client.mutate({
        mutation: USER_MUTATION,
        variables: { objects: [{ fire_uid: this.state.uid }] }
      });
      //this component is currently calling the unique firebase uid from the user object created by the auth admin SDK, and setting it as a prop of the local state of this component. I have visually confirmed this uid is what I am looking for and what I want to send to my postgres database
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>welcome</h1>
          <p>please sign in to create your own book of shadows</p>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
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
  }
}

export default SignIn;
