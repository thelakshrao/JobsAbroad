import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtkegNSxVCKZXlA0i_7AH_zhloAFISkxQ",
  authDomain: "jobsabroad-31d1b.firebaseapp.com",
  projectId: "jobsabroad-31d1b",
  storageBucket: "jobsabroad-31d1b.firebasestorage.app",
  messagingSenderId: "636551780161",
  appId: "1:636551780161:web:81d91f64e5c2ee28def3c0",
  measurementId: "G-L9SD9MN768"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);