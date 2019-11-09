import React from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
// Setup the network "links"
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_HASURA_ENDPOINT // use https for secure endpoint
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  // use wss for a secure endpoint
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

// Instantiate client
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default ({ children }) => {
  return <ApolloProvider client={client}> {children} </ApolloProvider>;
};
