import app from "firebase/app";
import "firebase/auth";

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

//exportable firebase instance init check

class Firebase {
  constructor() {
    app.initializeApp(fbConfig);
    this.auth = app.auth();
  }
  //Firebase Auth API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.sighOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
