import gql from "graphql-tag";

export const UPLOAD_MUTATION = gql`
  mutation insert_uploads($objects: [uploads_insert_input!]!) {
    insert_uploads(objects: $objects) {
      returning {
        id
        upload_url
        user_id
      }
    }
  }
`;
