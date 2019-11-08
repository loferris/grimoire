import gql from "graphql-tag"
import { client } from "./apollo";

export const subscriptions = client
  .query({
    query: gql`
    `
  })
  .then(result => console.log(result));
