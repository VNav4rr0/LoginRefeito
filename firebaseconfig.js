// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyCTglJlJ6glFL3Ue7PtT43PppHTdixv52U",
  authDomain: "teste-login-8b4bc.firebaseapp.com",
  projectId: "teste-login-8b4bc",
  storageBucket: "teste-login-8b4bc.appspot.com",
  messagingSenderId: "876508108529",
  appId: "1:876508108529:web:a47c107c732ab3d03bbb50",
  measurementId: "G-27YEJWHQBP"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize Auth e Firestore com AsyncStorage para persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

// Exporte auth e db para uso em outros arquivos
export { auth, db };
