//1. Require 'apollo-server'
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql` 

  # 1. Add Photo type definition
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }

  # 2. Return Photo from AllPhotos
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  # 3. Return newly posted photo from the mutation
  type Mutation {
    postPhoto(name: String! description: String): Photo!
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
        ...args
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
