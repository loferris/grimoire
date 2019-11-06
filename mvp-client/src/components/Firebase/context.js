import React from "react";

const FirebaseContext = React.createContext(null);

/*export const withFirebase = () => (
const firebaseConsumer = React.useContext(FirebaseContext);

    {firebase => <Component {...props} firebase={firebase} />}
);*/

export default FirebaseContext;
