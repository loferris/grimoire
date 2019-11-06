import React, { createContext } from "react";
import app from "firebase/app";

const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_AUTHDOMAIN,
      databaseURL: process.env.REACT_APP_DB_URL,
      projectId: process.env.REACT_APP_PROJECTID,
      storageBucket: process.env.REACT_APP_FB_BUCKET,
      messagingSenderid: process.env.REACT_APP_MSGID,
      appId: process.env.REACT_APP_APID
    });
  }

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};
