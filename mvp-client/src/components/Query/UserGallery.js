import gql from "graphql-tag";

export const UPLOADS_QUERY = gql`
query uploads($user_id: String!) {
  uploads(where: {user_id: {_eq: $user_id}}) {
    upload_url
  }
}
`;
