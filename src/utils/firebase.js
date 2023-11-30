
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider,updateProfile } from "firebase/auth";
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMiKCWSDAp_c_fVeMja8Gn4bd6Vf0IFGQ",
  authDomain: "molten-crowbar-351503.firebaseapp.com",
  projectId: "molten-crowbar-351503",
  storageBucket: "molten-crowbar-351503.appspot.com",
  messagingSenderId: "552429703460",
  appId: "1:552429703460:web:67dc60e012892cdbaa63b1",
  measurementId: "G-589ZPLE4F1"
};

const firebase = initializeApp(firebaseConfig);
const firesstore = getFirestore(firebase);
const analytics = getAnalytics(firebase);
// Initialize Firebase Authentication and get a reference to the service
export const firebases = initializeApp(firebaseConfig);
export const Auth = getAuth(firebase);
export const db_topics = collection(getFirestore(firebase), "topics");
export const db_posts = collection(getFirestore(firebase), "posts");
export const db = firesstore;
export const storage = getStorage(firebase);
export const provider = new GoogleAuthProvider();