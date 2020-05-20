import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firesntore";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};


//https://fir-functions-4bab8.firebaseapp.com/__/auth/action

class Firebase {
  constructor() {
    // Inicializa o Firebase
    firebase.initializeApp(firebaseConfig);

    // Configura pesistência de autentificação para "local"
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    // Módulos que serão utilizados
    this.auth = firebase.auth;
    this.functions = firebase.functions;
    this.firestore = firebase.firestore;

    // firebase.functions().useFunctionsEmulator('http://localhost:5001');
  }
}

export default new Firebase();
