import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC_t90KXavBUApnR7EKHXye7Dotrka2q6w",
    authDomain: "testastro-ef0cd.firebaseapp.com",
    projectId: "testastro-ef0cd",
    storageBucket: "testastro-ef0cd.firebasestorage.app",
    messagingSenderId: "479309672007",
    appId: "1:479309672007:web:ece2a629c1b4883e938b62",
    measurementId: "G-XJEWD8V8H0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);