import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWcqx_Gb8UJb4HmxamB7xaGvBZu999meQ",
    authDomain: "react-app-f8b50.firebaseapp.com",
    projectId: "react-app-f8b50",
    storageBucket: "react-app-f8b50.appspot.com",
    messagingSenderId: "167400345278",
    appId: "1:167400345278:web:f3ae9fd3187320e12a58ef",
    measurementId: "G-KV55WXZN08"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default, firebase };
