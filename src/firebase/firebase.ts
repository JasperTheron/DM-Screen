import {  initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD0G7TOz1B3aA4IlO9DS70914Kv_Ad6CY",
  authDomain: "dm-screen-df602.firebaseapp.com",
  projectId: "dm-screen-df602",
  storageBucket: "dm-screen-df602.appspot.com",
  messagingSenderId: "665823998484",
  appId: "1:665823998484:web:a91120561ab4ba4138ed01",
  measurementId: "G-6861KXFDZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const articlesCollection = collection(db, "articles");
export const creaturesCollection = collection(db, "creatures");
export const storage = getStorage();