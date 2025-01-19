import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
  apiKey: "AIzaSyBQ_BiXl6dCRqE7UngJ06VxNtBuYAp4_QY",
  authDomain: "summative-259ac.firebaseapp.com",
  projectId: "summative-259ac",
  storageBucket: "summative-259ac.firebasestorage.app",
  messagingSenderId: "129270158971",
  appId: "1:129270158971:web:967c31f89073926b41f4de"
};

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };