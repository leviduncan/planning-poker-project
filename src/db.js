import firebase from "firebase/app";
import "firebase/database";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCbCXKvaOhPnqcgEjhESuo9IjCLbvyx8GA",
    authDomain: "testing-7bdba.firebaseapp.com",
    databaseURL: "https://testing-7bdba.firebaseio.com",
    projectId: "testing-7bdba",
    storageBucket: "testing-7bdba.appspot.com",
    messagingSenderId: "123433442681",
    appId: "1:123433442681:web:e2576007bf4485162ca3a8"
  });
}

export default firebase
  .database()
  .ref()
  .child("planning-poker");

