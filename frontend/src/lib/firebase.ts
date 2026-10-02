import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBJYBCyA5oIwL2Kk98XdLUGpshEH5qZHc",
  authDomain: "mealtosmile-dec13.firebaseapp.com",
  projectId: "mealtosmile-dec13",
  storageBucket: "mealtosmile-dec13.firebasestorage.app",
  messagingSenderId: "1021952353567",
  appId: "1:1021952353567:web:a5d1198acd411bbda23c2a",
  measurementId: "G-BX1RPTZK8C",
};

// Initialize Firebase singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, firebaseConfig };
