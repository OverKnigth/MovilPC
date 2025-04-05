// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXev9YL6wRkdXVezshxFxXiBRwXFm37BE",
  authDomain: "app-log1.firebaseapp.com",
  databaseURL: "https://app-log1-default-rtdb.firebaseio.com",
  projectId: "app-log1",
  storageBucket: "app-log1.firebasestorage.app",
  messagingSenderId: "868728431563",
  appId: "1:868728431563:web:7a0acc7d5f8ee2a3edcc4e",
  measurementId: "G-T20QV1RFJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
export const auth = getAuth(app);