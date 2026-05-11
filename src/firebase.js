// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config object (get from Firebase Console → Project settings → Web app)
const firebaseConfig = {
	apiKey: "AIzaSyDqsaCMHDNluSTiaMOhRqcGVQKcD9a1bHw",
	authDomain: "evg-game-7e411.firebaseapp.com",
	projectId: "evg-game-7e411",
	storageBucket: "evg-game-7e411.firebasestorage.app",
	messagingSenderId: "488595025521",
	appId: "1:488595025521:web:3aba795e7fb903a62eb5d0",
	measurementId: "G-5RGHWCYZK8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;