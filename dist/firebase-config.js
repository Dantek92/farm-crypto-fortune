// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH4c1Y7do8EvSG81AgLo3_cISCbg0B2TQ",
  authDomain: "camelot-94a78.firebaseapp.com",
  projectId: "camelot-94a78",
  storageBucket: "camelot-94a78.firebasestorage.app",
  messagingSenderId: "898595914657",
  appId: "1:898595914657:web:f5007bbde8b7b1df9a41e0",
  measurementId: "G-TWF16FEHF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
