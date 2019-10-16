//1. Require 'apollo-server' and 'express'
const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { GraphQLScalarType } = require("graphql");
const { readFileSync } = require("fs");

const typeDefs = readFileSync("./typeDefs.graphql", "UTF-8");

//1. A variable that we will increment for unique ids
let _id = 0;
const users = [
  { githubLogin: "mHattrup", name: "Mike Hattrup" },
  { githubLogin: "gPlake", name: "Glen Plake" },
  { githubLogin: "sSchmidt", name: "Scot Schmidt" }
];

const photos = [
  {
    id: "1",
    name: "Dropping the Heart Chute",
    description: "The heart chute is one of my favorite chutes",
    category: "ACTION",
    githubUser: "gPlake",
    created: "3-28-1977"
  },
  {
    id: "2",
    name: "Enjoying the sunshine",
    category: "SELFIE",
    githubUser: "sSchmidt",
    created: "1-2-1985"
  },
  {
    id: "3",
    name: "Gunbarrel 25",
    description: "25 laps on gunbarrel today",
    category: "LANDSCAPE",
    githubUser: "sSchmidt",
    created: "2018-04-15T19:09:57.308Z"
  }
];

const tags = [
  { photoID: "1", userID: "gPlake" },
  { photoID: "2", userID: "sSchmidt" },
  { photoID: "2", userID: "mHattrup" },
  { photoID: "2", userID: "gPlake" }
];

const resolvers = {
  //2. Return length of photos array
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },

  //3. Mutation and postPhoto resolver
  Mutation: {
    postPhoto(parent, args) {
      let newPhoto = {
        id: _id++,
        ...args.input,
        created: new Date()
      };
      photos.push(newPhoto);
      return newPhoto;
    }
  },

  Photo: {
    url: parent => `http://yoursite.com/img/${parent.id}.jpeg`,
    postedBy: parent => {
      return users.find(u => u.githubLogin === parent.githubUser);
    },
    taggedUsers: parent =>
      tags
        //Returns an array of tags that only contain the current photo
        .filter(tag => tag.photoID === parent.id)
        //Converts the array of tags into an array of userIDs
        .map(tag => tag.userID)
        //Converts array of userIDs into an array of user objects
        .map(userID => users.find(u => u.githubLogin === userID))
  },

  User: {
    postedPhotos: parent => {
      return photos.filter(p => p.githubUser === parent.githubLogin);
    },
    inPhotos: parent =>
      tags
        //Returns an array of tags that only contain the current user
        .filter(tag => tag.userID === parent.id)
        //Converts the array of tags into an array of photoIDs
        .map(tag => tag.PhotoID)
        //Converts array of photoIDs into an array of photo objects
        .map(photoID => photos.find(p => p.id === photoID))
  },

  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value.",
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value
  })
};

//2. Create a new express app and new Apollo server
const app = express();
//3. Send it an object with typeDefs (the schema)
const server = new ApolloServer({
  typeDefs,
  resolvers
});
//4. Call 'applyMiddleware()' to allow middleware mounted on the same path
server.applyMiddleware({ app });
//5. Create a home route
app.get("/", (req, res) => res.end("Welcome to the PhotoShare API"));
//Create a playground route
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
//4. Call listen on a specific port
app.listen({ port: 4000 }, () =>
  console.log(
    `GraphQL Server running at http://localhost:4000${server.graphqlPath}`
  )
);
