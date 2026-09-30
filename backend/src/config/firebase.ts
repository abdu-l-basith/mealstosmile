import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { ENV } from "./env.js";

let firestoreDb: admin.firestore.Firestore | null = null;
let isFirebaseInitialized = false;

export function initializeFirebase(): admin.firestore.Firestore | null {
  if (firestoreDb) {
    return firestoreDb;
  }

  try {
    if (admin.apps.length > 0) {
      firestoreDb = admin.firestore();
      isFirebaseInitialized = true;
      return firestoreDb;
    }

    let credential: admin.AppOptions["credential"];

    // 1. Check if direct JSON string is provided in env
    if (ENV.FIREBASE_SERVICE_ACCOUNT_JSON) {
      const serviceAccount = JSON.parse(ENV.FIREBASE_SERVICE_ACCOUNT_JSON);
      credential = admin.credential.cert(serviceAccount);
    }
    // 2. Check if path to serviceAccountKey.json is provided
    else if (ENV.FIREBASE_SERVICE_ACCOUNT_KEY_PATH) {
      const keyPath = path.resolve(process.cwd(), ENV.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);
      if (fs.existsSync(keyPath)) {
        const fileContent = fs.readFileSync(keyPath, "utf-8");
        const serviceAccount = JSON.parse(fileContent);
        credential = admin.credential.cert(serviceAccount);
      } else {
        console.warn(`[Firebase] Service account key file not found at: ${keyPath}`);
      }
    }

    if (credential) {
      admin.initializeApp({
        credential,
        projectId: ENV.FIREBASE_PROJECT_ID,
      });
      firestoreDb = admin.firestore();
      isFirebaseInitialized = true;
      console.log("[Firebase] Initialized successfully with Service Account credentials.");
    } else {
      // Initialize with project ID or default application credentials
      admin.initializeApp({
        projectId: ENV.FIREBASE_PROJECT_ID,
      });
      firestoreDb = admin.firestore();
      isFirebaseInitialized = true;
      console.log(`[Firebase] Initialized with Project ID: ${ENV.FIREBASE_PROJECT_ID}`);
    }

    return firestoreDb;
  } catch (error) {
    console.warn(
      "[Firebase] Warning: Could not initialize Firebase Admin SDK. Please check your credentials in .env.",
      error instanceof Error ? error.message : error
    );
    firestoreDb = null;
    isFirebaseInitialized = false;
    return null;
  }
}

export function getFirestoreDb(): admin.firestore.Firestore | null {
  if (!isFirebaseInitialized) {
    return initializeFirebase();
  }
  return firestoreDb;
}
