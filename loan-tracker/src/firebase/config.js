import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoggFzq5yhT2hPXelCrhwMAQ6QHajv-KY",
  authDomain: "loanmanagement-fe109.firebaseapp.com",
  projectId: "loanmanagement-fe109",
  storageBucket: "loanmanagement-fe109.appspot.com",
  messagingSenderId: "707075278222",
  appId: "1:707075278222:web:e453bd5302ef0ca18110df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

// Explicit exports
export { db, auth };