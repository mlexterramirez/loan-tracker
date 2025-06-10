import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export auth methods
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};