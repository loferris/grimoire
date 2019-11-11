require('dotenv').config();

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
const port = process.env.PORT

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 || port }, () => console.log(`Apollo Server ready at http://localhost:${port}${server.graphqlPath}`) ); 
