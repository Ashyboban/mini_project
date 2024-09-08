// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "stay-finder-6b495.firebaseapp.com",
  projectId: "stay-finder-6b495",
  storageBucket: "stay-finder-6b495.appspot.com",
  messagingSenderId: "763288665152",
  appId: "1:763288665152:web:c2f7657972e0606ac8f3a5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);