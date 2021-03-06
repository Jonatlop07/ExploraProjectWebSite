import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_DATABASE_URL,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_APP_ID,
   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
   constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
      this.db = app.database();
      this.storage = app.storage();
   }

   doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

   doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

   doSignOut = () => this.auth.signOut();

   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

   doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

   user = uid => this.db.ref(`users/${uid}`);

   userPosts = uid => this.db.ref(`users/${uid}/publications/1`);

   users = () => this.db.ref(`users`);

   posts = () => this.db.ref(`publications`);

   topic = topic => this.db.ref(`publications/${topic}`);

   getUserPostKey = uid =>
      this.db.ref(`users/${uid}/publications`).child("1").getKey();

   pushByTopic = (topic, object) => {
      this.db.ref(`publications/${topic}`).push(object);
   };

   setByTopic = (topic, id, object) => {
      this.db.ref(`publications/${topic}`).child(id).set(object);
   };
}

export default Firebase;
