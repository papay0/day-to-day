const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

// TODO:
// - Create user in fetch if not exists

module.exports = {
  fetchUser: async function(email) {
    const users = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    return users;
  },
  fetchUserRef: async function(email) {
    const users = await this.fetchUser(email);
    return users.docs[0].id;
  },
  createUser: async function(email, displayName) {
    await db.collection("users").add({
      email: email,
      displayName: displayName
    });
  },
  savePromoContent: async function(email, content) {
    const users = await this.fetchUser(email);
    const ref = users.docs[0].id;
    await db
      .collection("promo")
      .doc(ref)
      .set({
        content: content
      });
  },
  getPromoContent: async function(email) {
    const users = await this.fetchUser(email);
    const ref = users.docs[0].id;
    return await db
      .collection("promo")
      .doc(ref)
      .get();
  },
  getTasks: async function(userRefId) {
    const tasksObj = await db
      .collection("tasks")
      .doc(userRefId)
      .collection("tasks")
      .get();
    const tasks = [];
    tasksObj.forEach(dailyTasks => {
      tasks.push({ id: dailyTasks.id, tasks: dailyTasks.data() });
    });
    return tasks;
  },
  getTasksForDate: async function(refUserId, date) {
    return await db
      .collection("tasks")
      .doc(refUserId)
      .collection("tasks")
      .where("date", "==", date);
  },
  createDefaultTasks: async function(refUserId, date) {
    console.log("refUserId = " + refUserId);
    console.log("date = " + date);
    await db
      .collection("tasks")
      .doc(refUserId)
      .collection("tasks")
      .add({
        date: date,
        tasks: [
          {
            type: "task",
            description: "Known issues",
            done: false,
            id: "iiuh",
            parentId: null,
            needsEditFocus: false,
            children: [
              {
                type: "subtask",
                description: "Css subtask not well right aligned",
                done: false,
                id: "lkjlkj",
                parentId: "iiuh",
                needsEditFocus: false
              }
            ]
          }
        ]
      });
  },
  saveTasks: async function(userRefId, tasks, id) {
    await db
      .collection("tasks")
      .doc(userRefId)
      .collection("tasks")
      .doc(id)
      .update(tasks);
  },
  getToday: function() {
    return new Date().getTime();
  },
  getTomorrow: function() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.getTime();
  }
};
