import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA-lSekFt9IAwRlnXYejwmQ3M5P2FB-SYc",
    authDomain: "docs-clone-nextjs-afae4.firebaseapp.com",
    projectId: "docs-clone-nextjs-afae4",
    storageBucket: "docs-clone-nextjs-afae4.appspot.com",
    messagingSenderId: "347107501462",
    appId: "1:347107501462:web:23ed4cc267139f50fc29b7"
};

const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

const db = app.firestore();

export {db};