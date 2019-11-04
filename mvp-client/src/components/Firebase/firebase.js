import app from "firebase/app";

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
  }
}

export default Firebase;
