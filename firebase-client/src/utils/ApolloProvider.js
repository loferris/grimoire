import React from "react";
import { client } from "./apollo";
import { subscriptions } from "/.graphqlSubscriptions";
import { ApolloProvider } from "react-apollo";

export default ApolloContextProvider = () => {
return (<ApolloProvider client={client}> {/**/} </ApolloProvider>)
};

//so currently the whole set up here is modular, and maybe linked incorrectly, but I'm pretty sure what's eventually going to happen is that subscriptions will actually be react components that can be embedded as context consumers throughout the app and are not part of this set up. But for now, I'm just setting up all the boilerplate as I understand it...
