import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import Firebase from "./firebase";
import withFirebaseAuth, { WrappedComponentProps } from "react-with-firebase-auth";

const firebaseApp = ({
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithTwitter,
  signInAnonymously,
  signOut,
  setError,
  user,
  error,
}: WrappedComponentProps) => (
);

const firebaseInstance = new Firebase();

const providers = {
  emailProvider: firebaseInstance.//()
}
