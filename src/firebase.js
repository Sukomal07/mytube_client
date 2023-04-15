import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH}`,
    projectId: `${process.env.REACT_APP_ID}`,
    storageBucket: `${process.env.REACT_APP_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const Provider = new GoogleAuthProvider()

export default app