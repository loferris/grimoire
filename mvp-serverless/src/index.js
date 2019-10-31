require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const { createWriteStream } = require('fs');
const path = require('path');
const express = require('express');
const { Storage } = require('@google-cloud/storage');
const firebase = require('firebase');

const files = [];

const typeDefs = gql`
  type Query {
    files: [String]
  }

  type Mutation {
    uploadFile(file: Upload!): Boolean
  }
`;

const gc = new Storage({
  keyFilename: path.join(__dirname, `./${process.env.CREDENTIALS}`),
  projectId: `${process.env.PROJECT_ID}`
});

const grimoireImages = gc.bucket(`${process.env.BUCKET}`);

const resolvers = {
  Query: {
    files: () => files
  },
  
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;

      await new Promise(res => 
        createReadStream()
          .pipe(
            grimoireImages.file(filename).createWriteStream({
              resumable: false,
              gzip: true
            })
          )
          .on('finish', res)
      );

    files.push(filename);
    return true;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use('/images', express.static(path.join(__dirname, './images')));
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log('Apollo Server ready at port 4000');
});

const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.TEST_URL,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: process.env.FB_BUCKET,
  messagingSenderId: process.env.ID
};
firebase.initializeApp(config);
