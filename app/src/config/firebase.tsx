import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqbQTwe-8tL6_AXFIa8pWn7JLANZZxktc",
  authDomain: "fir-test-726d7.firebaseapp.com",
  projectId: "fir-test-726d7",
  storageBucket: "fir-test-726d7.firebasestorage.app",
  messagingSenderId: "283254358277",
  appId: "1:283254358277:web:80e9b545ae51e99f09376c",
  measurementId: "G-PR9JS3H0KL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
