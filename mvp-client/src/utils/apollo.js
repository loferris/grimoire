import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_HASURA_ENDPOINT
});

export default ({ children }) => {
  return <ApolloProvider client={client}> {children} </ApolloProvider>;
};
