import * as firebase from 'firebase';
import 'firebase/firestore';
const prodConfig = {
  apiKey: "AIzaSyBYtpNcUiAjyQkpbpNDoj4ABIpnHIMXhfA",
  authDomain: "intense-inferno-8298.firebaseapp.com",
  databaseURL: "https://intense-inferno-8298.firebaseio.com",
  projectId: "intense-inferno-8298",
  storageBucket: "intense-inferno-8298.appspot.com",
  messagingSenderId: "524295091042"
};

const devConfig = {
  apiKey: "AIzaSyBYtpNcUiAjyQkpbpNDoj4ABIpnHIMXhfA",
  authDomain: "intense-inferno-8298.firebaseapp.com",
  databaseURL: "https://intense-inferno-8298.firebaseio.com",
  projectId: "intense-inferno-8298",
  storageBucket: "intense-inferno-8298.appspot.com",
  messagingSenderId: "524295091042"
};

const config = process.env.NODE_ENV === 'production' ?
  prodConfig :
  devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
const auth = firebase.auth();

export {
  db,
  auth,
};