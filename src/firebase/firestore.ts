import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCVg5DYZAXR8eY_Dy8GkO3-0jDHbEgAR2U",
  authDomain: "cloudcomputingclc.firebaseapp.com",
  projectId: "cloudcomputingclc",
  storageBucket: "cloudcomputingclc.appspot.com",
  messagingSenderId: "274416367195",
  appId: "1:274416367195:web:6bcc53e57f9ebe8fc8317e"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app)

export { firestore, auth };