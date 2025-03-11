import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAxEtu2dTM-0BedTQdwHDkD1BWdDLGbA8c",
    authDomain: "uber-effc0.firebaseapp.com",
    projectId: "uber-effc0",
    storageBucket: "uber-effc0.appspot.com",
    messagingSenderId: "901601216624",
    appId: "1:901601216624:web:3545c3c72d632699e38cb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
