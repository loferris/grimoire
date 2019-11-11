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
  let input;
  const [insert_users, { data }] = useMutation(USER_MUTATION);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          insert_users({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Demo</button>
      </form>
    </div>
  );
}
