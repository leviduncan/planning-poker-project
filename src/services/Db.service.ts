import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/analytics';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDQw8SrAqQ4yDwbMpolW574MgJf0Znwa4c',
    authDomain: 'planning-poker-project-22.firebaseapp.com',
    databaseURL: 'https://planning-poker-project-22-default-rtdb.firebaseio.com',
    projectId: 'planning-poker-project-22',
    storageBucket: 'planning-poker-project-22.appspot.com',
    messagingSenderId: '681283855494',
    appId: '1:681283855494:web:6033cb8884800c770a1d07',
    measurementId: 'G-W2JXHCQC1R',
  });
}

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: 'AIzaSyCbCXKvaOhPnqcgEjhESuo9IjCLbvyx8GA',
//     authDomain: 'testing-7bdba.firebaseapp.com',
//     databaseURL: 'https://testing-7bdba.firebaseio.com',
//     projectId: 'testing-7bdba',
//     storageBucket: 'testing-7bdba.appspot.com',
//     messagingSenderId: '123433442681',
//     appId: '1:123433442681:web:e2576007bf4485162ca3a8',
//     measurementId: 'G-3JGGSGBJH4',
//   });
// }

export const DatabaseService = firebase
  .database()
  .ref()
  .child('planning-poker-v2');

export const analytics = firebase.analytics();
