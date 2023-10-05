// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
import "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6XtQ4Nlq_1SP6Yam8WX-bZ8ptcLbMck4",
  authDomain: "findmytradie-83fa4.firebaseapp.com",
  projectId: "findmytradie-83fa4",
  storageBucket: "findmytradie-83fa4.appspot.com",
  messagingSenderId: "264173101989",
  appId: "1:264173101989:web:654bb1824ad8f96cac3e4c",
  measurementId: "G-JHK4Y4MXW8",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage, firebase };
