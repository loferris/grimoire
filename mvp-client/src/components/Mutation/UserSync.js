import React from "react";
//import { Mutation } from "react-apollo";
//import PropTypes from "prop-types";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const USER_MUTATION = gql`
  mutation insert_users($type: String!) {
    insert_users(type: $type) {
      id
      type
    }
  }
`;

export default function UserSync() {
  let input = this.state.uid;
  const client = useApolloClient();
  const [insert_users, { data }] = useMutation(USER_MUTATION);

  return <h1>complete</h1>;
}
