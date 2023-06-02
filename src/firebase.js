import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBGIfZ1ciRWWflj4StvXnTlTtHhYsIpyAE",
  authDomain: "challenge-caded.firebaseapp.com",
  projectId: "challenge-caded",
  storageBucket: "challenge-caded.appspot.com",
  messagingSenderId: "520835524599",
  appId: "1:520835524599:web:10c19bcae729a4191170f2",
  measurementId: "G-5REBHN2S1Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};