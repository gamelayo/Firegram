import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_fz-jyU5t6fHSKSWV1eIN6T9GQls9O18",
  authDomain: "firegram-b2002.firebaseapp.com",
  projectId: "firegram-b2002",
  storageBucket: "firegram-b2002.appspot.com",
  messagingSenderId: "838868786606",
  appId: "1:838868786606:web:3e9a2c1e07d28894a23c3f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
