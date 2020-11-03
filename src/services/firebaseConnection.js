import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyD_WqlCqBu5Mr3D5xZAKaMFTfmYwihN05A",
  authDomain: "sujeitopost-3e5b4.firebaseapp.com",
  databaseURL: "https://sujeitopost-3e5b4.firebaseio.com",
  projectId: "sujeitopost-3e5b4",
  storageBucket: "sujeitopost-3e5b4.appspot.com",
  messagingSenderId: "120812690840",
  appId: "1:120812690840:web:5f8aa88c67ee38e3c05fed",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
