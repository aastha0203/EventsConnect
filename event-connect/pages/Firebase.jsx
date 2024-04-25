// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth} from "firebase/auth";
//import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6Zf2NsF7E6n_xjB0Xrea9jPYZgy630ik",
  authDomain: "eventconnect-d45ac.firebaseapp.com",
  projectId: "eventconnect-d45ac",
  storageBucket: "eventconnect-d45ac.appspot.com",
  messagingSenderId: "454833509326",
  appId: "1:454833509326:web:e587dd152c2e545336519f",
  measurementId: "G-2J3Y7ZWTGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
//xport const firestore = getFirestore(app);
export default function(){<>Nothing is here!</>}