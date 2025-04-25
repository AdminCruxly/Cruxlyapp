// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx0l6Hk_GJZgPzMZHYOcF7VfrNXcxxkxw",
  authDomain: "cruxlyapp-65adb.firebaseapp.com",
  projectId: "cruxlyapp-65adb",
  storageBucket: "cruxlyapp-65adb.firebasestorage.app",
  messagingSenderId: "25806073701",
  appId: "1:25806073701:web:236f20edd69f9789f8fb8c",
  measurementId: "G-FS5CDDYG9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);