//import modules
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { readFileSync } = require("fs");
//import files
const typeDefs = readFileSync("./typeDefs.graphql", "UTF-8");
const resolvers = require("./resolvers");

//create express app
const app = express();
//create apollo express server and send it an object with typeDefs (the schema)
const server = new ApolloServer({
  typeDefs,
  resolvers
});
//call 'applyMiddleware()' to allow middleware mounted on the same path
server.applyMiddleware({ app });
//create a home route
app.get("/", (req, res) => res.end("Welcome to the PhotoShare API"));
//create a playground route
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
//call listen on a specific port
app.listen({ port: 4000 }, () =>
  console.log(
    `GraphQL Server running at http://localhost:4000${server.graphqlPath}`
  )
);
