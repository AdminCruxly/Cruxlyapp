// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_t90KXavBUApnR7EKHXye7Dotrka2q6w",
  authDomain: "testastro-ef0cd.firebaseapp.com",
  projectId: "testastro-ef0cd",
  storageBucket: "testastro-ef0cd.firebasestorage.app",
  messagingSenderId: "479309672007",
  appId: "1:479309672007:web:ece2a629c1b4883e938b62",
  measurementId: "G-XJEWD8V8H0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);