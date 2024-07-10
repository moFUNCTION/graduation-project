// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT8vURbkW5BjHTa_8GTI4zRowg5DRciGA",
  authDomain: "imagesuploader-c1103.firebaseapp.com",
  projectId: "imagesuploader-c1103",
  storageBucket: "imagesuploader-c1103.appspot.com",
  messagingSenderId: "15891868545",
  appId: "1:15891868545:web:93e9ab34a52c7356109680",
  measurementId: "G-M507KRSR6X",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const facebookAuth = new FacebookAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
