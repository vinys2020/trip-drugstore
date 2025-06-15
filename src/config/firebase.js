import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB3wTB90P-lcch5TTm1MSKqeemKPfw3G_0",
  authDomain: "tripbd-c6698.firebaseapp.com",
  projectId: "tripbd-c6698",
  storageBucket: "tripbd-c6698.firebasestorage.app",
  messagingSenderId: "586057934302",
  appId: "1:586057934302:web:09004892694608e34be94f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();
