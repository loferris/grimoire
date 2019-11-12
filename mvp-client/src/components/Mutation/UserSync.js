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
