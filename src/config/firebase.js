import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCEY664gwKyXFUJWah8TFkBkjUsoe517jU",
  authDomain: "swiggy-clone-fe268.firebaseapp.com",
  projectId: "swiggy-clone-fe268",
  storageBucket: "swiggy-clone-fe268.appspot.com",
  messagingSenderId: "31773999921",
  appId: "1:31773999921:web:e42ade411e045273c8e610"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;