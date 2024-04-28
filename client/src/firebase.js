// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a84a4.firebaseapp.com",
  projectId: "mern-blog-a84a4",
  storageBucket: "mern-blog-a84a4.appspot.com",
  messagingSenderId: "287924091981",
  appId: "1:287924091981:web:8276aa8bfb0d600bf43004",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
