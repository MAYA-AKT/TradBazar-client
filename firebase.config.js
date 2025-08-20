
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMMCpTmV2Y6ctXkF5wZTcn_q4GPbi_uho",
  authDomain: "tradbazar-client.firebaseapp.com",
  projectId: "tradbazar-client",
  storageBucket: "tradbazar-client.firebasestorage.app",
  messagingSenderId: "311725978132",
  appId: "1:311725978132:web:4ff1e4ec24612e7f47ed01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);