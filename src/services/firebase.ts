// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
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

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics only in browser environment
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && getAnalytics(app));
}