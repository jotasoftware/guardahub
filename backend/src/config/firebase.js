import admin from "firebase-admin";

import path from "path";

const serviceAccount = path.resolve("./src/config/privateKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db, admin };