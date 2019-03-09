const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

module.exports = {
  fetchUser: async function (email) {
    return await db.collection("users").where("email", "==", email).get();
  },
  createUser: async function (email, displayName) {
    await db.collection("users").add({
      email: email,
      displayName: displayName
    })
  },
  savePromoContent: async function (email, content) {
    const users = await this.fetchUser(email);
    const ref = users.docs[0].id;
    await db.collection("promo").doc(ref).set({
      content: content
    })
  },
  getPromoContent: async function (email, content) {
    const users = await this.fetchUser(email);
    const ref = users.docs[0].id;
    console.log("ref promo doc " + ref);
    return await db.collection("promo").doc(ref).get();
  }
};