const functions = require("firebase-functions");
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
  const email = req.param("email");
  const content = await firebase.getPromoContent(email);
  res.send(content.data());
});

app.get("/standup", async (req, res) => {
  const email = req.param("email");
  const todayOnClient = req.param("todayOnClient");
  const yesterdayOnClient = req.param("yesterdayOnClient");
  let userRefId = await firebase.fetchUserRef(email);
  const standup = await firebase.getStandup(userRefId, todayOnClient, yesterdayOnClient);
  res.send(standup);
});

app.get("/tasks", async (req, res) => {
  const email = req.param("email");
  const todayOnClient = req.param("todayOnClient");
  const tomorrowOnClient = req.param("tomorrowOnClient");
  let userRefId = await firebase.fetchUserRef(email);
  const tasksForToday = await firebase.getTasksForDate(userRefId, todayOnClient);
  const tasksForTomorrow = await firebase.getTasksForDate(userRefId, tomorrowOnClient);
  if (tasksForToday.empty) {
    console.log("I create today => " + todayOnClient)
    await firebase.createDefaultTasks(userRefId, todayOnClient);
  }
  if (tasksForTomorrow.empty) {
    console.log("I create tomorrow")
    await firebase.createDefaultTasks(userRefId, tomorrowOnClient);
  }
  const tasks = await firebase.getTasks(userRefId);
  res.send(tasks);
});

app.post("/tasks", async (req, res) => {
  const email = req.body.email;
  const card = req.body.card;
  const id = req.body.id;
  let userRefId = await firebase.fetchUserRef(email);
  await firebase.saveTasks(userRefId, card, id);
  res.send("Tasks saved!");
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
