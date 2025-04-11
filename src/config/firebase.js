// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 REEMPLAZÁ esto con tu config real desde la consola de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB3wTB90P-lcch5TTm1MSKqeemKPfw3G_0",
    authDomain: "tripbd-c6698.firebaseapp.com",
    projectId: "tripbd-c6698",
    storageBucket: "tripbd-c6698.firebasestorage.app",
    messagingSenderId: "586057934302",
    appId: "1:586057934302:web:09004892694608e34be94f"
  };

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
