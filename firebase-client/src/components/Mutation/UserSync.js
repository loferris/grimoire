import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { SignIn } from "../../views/UserAccess/SignIn";

const USER_SYNC = gql`
  mutation user_sync($objects: [insert_users_input!]!) {
    __typename
    insert_users(objects: $objects) {
      returning {
        fire_uid
      }
    }
  }
`;

export default function UserSync() {
  const client = useApolloClient();
  const [userId, { loading, error }] = useMutation(USER_SYNC, {
    onCompleted({ UserId }) {
      client.writeData({ data: { fire_id: this.state.uid } });
    }
  });
  return <SignIn login={userId} />;
}
