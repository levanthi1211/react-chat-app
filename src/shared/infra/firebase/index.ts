import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhfuduJ66hCi2L21DYS5M9Dllmz_n1cZg",
  authDomain: "chat-58e42.firebaseapp.com",
  projectId: "chat-58e42",
  storageBucket: "chat-58e42.appspot.com",
  messagingSenderId: "54593117665",
  appId: "1:54593117665:web:742c117f4ebc25025486a0",
  measurementId: "G-EHYFRW2CTR",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const storage = getStorage(app);

export { db, auth, provider, storage };
