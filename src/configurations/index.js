// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHoE70uULucZQg-qjS9w0oIPRsJSUUGnE",
  authDomain: "sort-n-stay.firebaseapp.com",
  projectId: "sort-n-stay",
  storageBucket: "sort-n-stay.appspot.com",
  messagingSenderId: "2329448533",
  appId: "1:2329448533:web:aec7814900f763faae04dc",
  measurementId: "G-K5MCPEBQXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);