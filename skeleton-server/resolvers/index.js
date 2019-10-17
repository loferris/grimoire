require('dotenv').config();

const { GraphQLScalarType } = require("graphql");
const fetch = require('node-fetch');
const { ObjectID } = require('mongodb');
const { authorizeWithGithub } = require('../lib');

module.exports = {
  //2. Return length of photos array
  Query: {
    totalPhotos: (parent, args, { db }) =>
      db.collection("photos").estimatedDocumentCount(),

    allPhotos: (parent, args, { db }) =>
      db
        .collection("photos")
        .find()
        .toArray(),

    totalUsers: (parent, args, { db }) =>
      db.collection("users").estimatedDocumentCount(),

    allUsers: (parent, args, { db }) =>
      db
        .collection("users")
        .find()
        .toArray()
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

  async githubAuth(parent, { code }, { db }) {
    //obtain data from github
    let {
      message,
      access_token,
      avatar_url,
      login,
      name
    } = await authorizeWithGithub({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
    })
    //if there is a message, something went wrong
    if (message) {
      throw new Error(message)
    }
    //package the results into a single object
    let latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url
    }
    //add or update the record with new information
    const { ops:[user] } = await db
      .collection('users')
      .replaceOne({ githubLogin: login, latestUserInfo, { upsert: true })
    //return user data and their token
    return { user, token: access_token }
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
