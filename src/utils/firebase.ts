import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB18Y7azsoqbRbPN9ss6gT9rGO9BNBQls4",
  authDomain: "video-pembelajaran-bb886.firebaseapp.com",
  projectId: "video-pembelajaran-bb886",
  storageBucket: "video-pembelajaran-bb886.firebasestorage.app",
  messagingSenderId: "234301376403",
  appId: "1:234301376403:web:938fcc08b3fec1ce50ca66",
  measurementId: "G-ZCSNPEVQV0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
