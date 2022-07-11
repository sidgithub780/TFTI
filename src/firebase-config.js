// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

import { useEffect, useState } from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1XgiPMWdA8IJRwDq5nQzODbCUkZcSjyQ",
  authDomain: "rsvper-6f9ff.firebaseapp.com",
  projectId: "rsvper-6f9ff",
  storageBucket: "rsvper-6f9ff.appspot.com",
  messagingSenderId: "56841335585",
  appId: "1:56841335585:web:27ba4c65ab7619de4e8460",
  measurementId: "G-99FBVENV9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
