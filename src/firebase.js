import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    //Enter in your firebase configuration here
    apiKey: "AIzaSyA3Zss9BlZ68dIkSu_GuUsViifjwlBMuoc",
    authDomain: "vue-fire-todo-f4d23.firebaseapp.com",
    projectId: "vue-fire-todo-f4d23",
    storageBucket: "vue-fire-todo-f4d23.appspot.com",
    messagingSenderId: "57398079228",
    appId: "1:57398079228:web:28730fb0240a3f7309b179",
    measurementId: "G-54K9TFEGXZ"
  });

 const db = firebaseApp.firestore();
 
 export default db;