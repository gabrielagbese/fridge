
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider , getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBqjrYK672Om-zff7DXClxPm2F9rvh33Pg",
  authDomain: "fridge-659db.firebaseapp.com",
  projectId: "fridge-659db",
  storageBucket: "fridge-659db.appspot.com",
  messagingSenderId: "195747445986",
  appId: "1:195747445986:web:e4e17968515bd3d52972bb",
  measurementId: "G-12EG2W7P1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const db = getFirestore(app)