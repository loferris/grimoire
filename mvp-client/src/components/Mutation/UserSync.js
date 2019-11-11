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

/*export default function UserSync() {
  let input = this.state.uid;
  const client = useApolloClient();
  const [insert_users, { data }] = useMutation(USER_MUTATION);

  return <h1>complete</h1>;
}*/
