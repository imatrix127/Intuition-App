import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAmZokJOkKgrZ36UVLWsXCyrty67nWUqjA",
    authDomain: "gifted-chat-app-ba3ec.firebaseapp.com",
    projectId: "gifted-chat-app-ba3ec",
    storageBucket: "gifted-chat-app-ba3ec.appspot.com",
    messagingSenderId: "701606440702",
    appId: "1:701606440702:web:39879f0d0a5fa238257faf",
    measurementId: "G-90PZNSCFN0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };