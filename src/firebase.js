import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyB8cIfPXySoV2X-NtqVm7jwWor5-ggBngw",
    authDomain: "todo-7f79a.firebaseapp.com",
    databaseURL: "https://todo-7f79a-default-rtdb.firebaseio.com",
    projectId: "todo-7f79a",
    storageBucket: "todo-7f79a.appspot.com",
    messagingSenderId: "892808983745",
    appId: "1:892808983745:web:f4fdc8ef03693c7b581040",
    measurementId: "G-ZL2206DR29",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection,
};
