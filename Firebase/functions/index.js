const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");
const firebase = require("./internal/firebase");

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/promo", async (req, res) => {
  const email = req.body.email;
  const content = req.body.content;
  await firebase.savePromoContent(email, content);
  res.send("Promo saved!");
});

app.get("/promo", async (req, res) => {
  const email = req.param('email');
  console.log("email promo - " + email);
  const content = await firebase.getPromoContent(email);
  res.send(content.data());
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const displayName = req.body.displayName;
  const users = await firebase.fetchUser(email);
  if (users.empty) {
    await firebase.createUser(email, displayName);
  }
  res.send("User saved!");
});
app.get("/", (req, res) => res.send("Hello and welcome to API"));

exports.API = functions.https.onRequest(app);