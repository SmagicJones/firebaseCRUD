// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKdIOJ5_YxHDZ_sVI82W12X6wh3-L2_dc",
  authDomain: "portfolio-867c5.firebaseapp.com",
  projectId: "portfolio-867c5",
  storageBucket: "portfolio-867c5.appspot.com",
  messagingSenderId: "838199979877",
  appId: "1:838199979877:web:5c8a4afe76a0972160bb8c",
  measurementId: "G-6TD058X5F0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
