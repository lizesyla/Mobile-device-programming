// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBGozaE9OG2CCqGYbYfiBfC0qYMwg3v73A",
  authDomain: "task-manager-b6e07.firebaseapp.com",
  projectId: "task-manager-b6e07",
  storageBucket: "task-manager-b6e07.firebasestorage.app",
  messagingSenderId: "1001291115613",
  appId: "1:1001291115613:web:7a0c2ccde52ebbcafbf1b4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 