import { firebaseApp } from '../../firebase';
import firebase from 'firebase';
const URL = 'http://localhost:3000/';

const facebookLoginThunk = (dispatch) => {
  console.log('got here');
  const provider = new firebase.auth.FacebookAuthProvider();
  firebaseApp.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('facebook login worked', user);
    // WE HAVE TO REDIRECT TO HOME PAGE HERE
  }).catch(function(error) {
    console.log('facebook login failed', error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  });
};
export default facebookLoginThunk;
