// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1bmP1glEoXHMCpyEvDv9hPTc7xFhYN54",
  authDomain: "netflixgpt-d143c.firebaseapp.com",
  projectId: "netflixgpt-d143c",
  storageBucket: "netflixgpt-d143c.appspot.com",
  messagingSenderId: "577840158881",
  appId: "1:577840158881:web:0d5983e43801038be9f8e0",
  measurementId: "G-HXZ89871RK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();