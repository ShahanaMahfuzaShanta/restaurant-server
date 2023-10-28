const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5xg31u2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const usersCollection = client.db("restaurant-management").collection("users");
    const menuCollection = client.db("restaurant-management").collection("menu");
    const reviewsCollection = client.db("restaurant-management").collection("reviews");

    app.get(
        "/users", async (req, res) => {
          const result = await usersCollection.find().toArray();
          //console.log(result);
          res.send(result);
        }
      );

    app.get(
        "/menu", async (req, res) => {
          const result = await menuCollection.find().toArray();
          //console.log(result);
          res.send(result);
        }
      );

    app.get(
        "/reviews", async (req, res) => {
          const result = await reviewsCollection.find().toArray();
          //console.log(result);
          res.send(result);
        }
      );
  
  } finally {
    
  }
}
run().catch((err) => console.error(err));


app.get('/', (req, res) => {
    res.send('Users Management server is running')
})

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`)
})