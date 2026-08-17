// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFNSJMy7jo2MOpK9feswOVDjsUW3HMokw",
  authDomain: "ekosistem-pipd.firebaseapp.com",
  projectId: "ekosistem-pipd",
  storageBucket: "ekosistem-pipd.firebasestorage.app",
  messagingSenderId: "1024901950839",
  appId: "1:1024901950839:web:45cf2d6efcc9e714d04572",
  measurementId: "G-YXHPGG8THW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { 
    app, 
    auth, 
    db, 
    googleProvider, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    signInWithPopup, 
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    doc, 
    onSnapshot,
    query,
    orderBy,
    getDoc,
    setDoc
};
