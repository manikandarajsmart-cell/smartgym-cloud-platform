import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBr9t4b4yODB8J9b5H5D_8-6C2jKh-s2vE",
  authDomain: "gen-lang-client-0829915933.firebaseapp.com",
  projectId: "gen-lang-client-0829915933",
  storageBucket: "gen-lang-client-0829915933.firebasestorage.app",
  messagingSenderId: "520050490879",
  appId: "1:520050490879:web:b85efe4005099a52b0bbca",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const storage = getStorage(
  app,
  "gs://gen-lang-client-0829915933.firebasestorage.app"
);

export default app;
