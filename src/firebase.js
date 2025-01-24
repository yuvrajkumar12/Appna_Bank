// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7CAh99CEWsmpYOJUA8qSkEWrxNN0u7aY",
  authDomain: "financely-recd.firebaseapp.com",
  projectId: "financely-recd",
  storageBucket: "financely-recd.firebasestorage.app",
  messagingSenderId: "795052008358",
  appId: "1:795052008358:web:b3371addc3302b8bb2a567",
  measurementId: "G-4FBMVCYLFK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db, auth, provider,doc,setDoc};