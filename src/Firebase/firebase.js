// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnMw3-BG2n0mMPCH-TTTgnDu_6Ub3K93E",
  authDomain: "deliveryapp-72734.firebaseapp.com",
  databaseURL: "https://deliveryapp-72734-default-rtdb.firebaseio.com",
  projectId: "deliveryapp-72734",
  storageBucket: "deliveryapp-72734.appspot.com",
  messagingSenderId: "275874797408",
  appId: "1:275874797408:web:e208ce24ac304eec753005",
  measurementId: "G-HN4ZHEDDSF",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
