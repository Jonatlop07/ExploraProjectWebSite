import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.js";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

firebase.initializeApp({
   apiKey: "AIzaSyAgyWyR3fBJfyD2XxA5qCjKqDv7CebfVUc",
   authDomain: "fir-react-auth-explora.firebaseapp.com",
   databaseURL: "https://fir-react-auth-explora.firebaseio.com",
   projectId: "fir-react-auth-explora",
   storageBucket: "fir-react-auth-explora.appspot.com",
   messagingSenderId: "1074941844633",
   appId: "1:1074941844633:web:59bf929b0949d412406c08",
   measurementId: "G-SK2XZ0S16D",
});

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
