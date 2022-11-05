// ** Imports
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 15000;

// ** Middlewares
app.use(cors());
app.use(express.json());

// ** test api end point

app.get("/", (req, res) => res.send(`Server is running on ${port}`));

// ** DB Connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7ikallh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// ** DB Connections for interactions

const run = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error.message);
  }
};

// ** Api end point interactions

// ** Api endpoints -> 1. users/ 2.registrations/ 3.login/ 4.p-users/(paginations)

// ** Making database and collections
const usersCollection = client.db("loginRegistration").collection("users");

app.get("/users", async (req, res) => {
  try {
    const query = {};

    const cursor = usersCollection.find();
    const users = await cursor.toArray();

    // if (!users.data) {
    //   res.send({
    //     success: false,
    //     message: "No user found",
    //   });
    // }

    res.send({
      success: true,
      data: users,
      message: "User data accessed",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// ** registration of users

app.post("/registration", async (req, res) => {
  try {
    const userData = req.body;
    const { name, email, password } = userData;

    // ** user data validation for all credentials
    if (!name || !email || !password) {
      return res.send({
        success: false,
        message: "User credentials missing",
        status: 403,
      });
    }
    // ** If credentials are validated

    const userDocument = {
      name,
      email,
      password,
    };

    const user = await usersCollection.insertOne(userDocument);

    res.send({
      success: true,
      data: user,
      message: `Successfully created ${user.name}`,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// ** user login

app.post("/login", async (req, res) => {
  try {
    // ** get the user data from request body
    // ** validate user email and password (email and password ase ki nai)
    // ** Jodi email and password thake tahole sei email and password er against a db te user ase ki nai
    // ** jodi thake tahole sei user k as response hisabe send kore dau
  } catch (error) {}
});

// ** app listen

app.listen(port, () => {
  client.connect((err) => {
    if (err) {
      console.log("Db Error happend");
    } else {
      console.log("Db connected");
    }
  });
  console.log(`Server is running on port ${port}`);
});
