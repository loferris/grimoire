import React from "react";
//import { Mutation } from "react-apollo";
//import PropTypes from "prop-types";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const USER_MUTATION = gql`
  mutation insert_users($objects: [users_insert_input!]!) {
    insert_users(objects: $objects) {
      returning {
        id
        fire_uid
      }
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
          insert_users({ variables: { objects: { fire_uid: "" } });
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
