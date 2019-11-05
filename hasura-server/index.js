require('dotenv').config();

const express = require("express");
const ApolloServer = require("apollo-server-express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (request, response) => {
  response.json({ message: "Hello from the hasura server" });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
