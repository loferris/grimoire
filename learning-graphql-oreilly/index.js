//1. Require 'apollo-server'
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql` 

  enum PhotoCategory {
  SELFIE
  PORTRAIT
  ACTION
  LANDSCAPE
  GRAPHIC
  }

  # 1. Add Photo type definition
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
  }

  # 2. Return Photo from AllPhotos
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  input PostPhotoInput {
  "The name of the new photo"
  name: String!
  "(optional) A brief description of the photo"
  description: String
  "(optional) The category that defines the photo"
  category: PhotoCategory=PORTRAIT
  }

  # 3. Return newly posted photo from the mutation
  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
  }
`
//1. A variable that we will increment for unique ids
let _id = 0
const photos = []

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
        ...args.input
      }
      photos.push(newPhoto)
      return newPhoto
    }
  },

  Photo: {
    url: parent => `http://yoursite.com/img/${parent.id}.jpeg`
  }
}

//2. Create a new isntance of the server.
//3. Send it an object with typeDefs (the schema)
const server = new ApolloServer({
  typeDefs,
  resolvers
})

//4. Call listen on the server to launch the web server
server
  .listen()
  .then(({url}) => console.log(`GraphQL Service running on ${url}`))
