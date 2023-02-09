import firebase, { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC1mSfEBzxwEmcV1w9GkKoc6Az05RBRsaM",
  authDomain: "intern-project02.firebaseapp.com",
  projectId: "intern-project02",
  storageBucket: "intern-project02.appspot.com",
  messagingSenderId: "733131022847",
  appId: "1:733131022847:web:eec1fb58f0af403156c7ca",
  measurementId: "G-VNJYGCRZTZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { db, auth, storage };
// const analytics = getAnalytics(app);
