// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGozaE9OG2CCqGYbYfiBfC0qYMwg3v73A",
  authDomain: "task-manager-b6e07.firebaseapp.com",
  projectId: "task-manager-b6e07",
  storageBucket: "task-manager-b6e07.firebasestorage.app",
  messagingSenderId: "1001291115613",
  appId: "1:1001291115613:web:f75865520b457109fbf1b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);