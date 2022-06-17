// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVnzffoTAT7m12RQbIqX3-URJHAtU2NAs",
  authDomain: "realtime-editor-8799c.firebaseapp.com",
  projectId: "realtime-editor-8799c",
  storageBucket: "realtime-editor-8799c.appspot.com",
  messagingSenderId: "881386762626",
  appId: "1:881386762626:web:55dd0cee2daa6fdfc3df9b",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
