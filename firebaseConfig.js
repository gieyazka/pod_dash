import {getFirestore} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAJAzSqLer6P-g9KLoxEx9fsPgJnjKtFCU",
    authDomain: "gps-delivery-ef99b.firebaseapp.com",
    projectId: "gps-delivery-ef99b",
    storageBucket: "gps-delivery-ef99b.appspot.com",
    messagingSenderId: "581224480788",
    appId: "1:581224480788:web:276c07aabd6ba78cf3a701",
    measurementId: "G-LJJVPT759Q"
  };
  
 export const app = initializeApp(firebaseConfig);
 export const database = getFirestore(app);