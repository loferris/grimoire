import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import SignIn from "../../views/UserAccess/SignIn";

const USER_SYNC = gql`
  mutation insert_users($fireUid: String!) {
    insert_users(fire_uid: $fireUid)
  }
`;

export default function UserSync() {
  const client = useApolloClient();
  const [insert_users, { loading, error }] = useMutation(USER_SYNC, {
    onCompleted({ insert_users }) {
      client.writeData({ data: { fire_uid: this.state.uid } });
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred</p>;

  return <SignIn login={insert_users} />;
}
