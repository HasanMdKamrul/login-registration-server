const { MongoClient } = require("mongodb");

function getUserCollection() {
  // ** DB Connection

  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7ikallh.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);
  const usersCollection = client.db("loginRegistration").collection("users");
}

module.exports = {
  getUserCollection,
};
