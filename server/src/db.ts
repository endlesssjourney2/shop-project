import * as admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

let serviceAccount: ServiceAccount;

try {
  serviceAccount = require("./serviceAccountKey.json");
  console.log("Using local serviceAccountKey.json");
} catch (error) {
  console.log("No local key found. Using Environment Variables.");

  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_PRIVATE_KEY ||
    !process.env.FIREBASE_CLIENT_EMAIL
  ) {
    throw new Error(
      "Firebase environment variables are not set! Please add them on Render.com"
    );
  }

  serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
      /\\n/g,
      "\n"
    ),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  } as ServiceAccount;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export default db;
