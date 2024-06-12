import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const app = initializeApp({
  apiKey: "AIzaSyBE7peZula4PpiVGsJxbyiXFViPcVz70v4",
  authDomain: "house-marketplace-e58fe.firebaseapp.com",
  projectId: "house-marketplace-e58fe",
  storageBucket: "house-marketplace-e58fe.appspot.com",
  messagingSenderId: "154274744521",
  appId: "1:154274744521:web:6dee5be00ba71c191ea518"
})
const db = getFirestore(app)
export {app, db}