import firebaseApp  from '../../firebase';
import firebase from 'firebase';
import axios from 'axios';
const URL = 'http://localhost:3000';

const facebookLoginThunk = (dispatch) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebaseApp.auth().signInWithPopup(provider).then(function(result) {
    const token = result.credential.accessToken;
    const user = result.user;
    console.log(result, token, user);
    firebase.auth().currentUser.getToken(true)
    .then(function(idToken) {
      console.log('idToken', idToken);
      axios.post(URL + '/auth/facebook', {
        token: idToken
      }).catch(function(error) {
        console.log('axios did not go through');
      });
    }).catch(function(error) {
      console.log('error getting token', error);
    });
    // WE HAVE TO REDIRECT TO HOME PAGE HERE
  }).catch(function(error) {
    console.log('facebook login failed', error);
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
    // ...
  });
};
export default facebookLoginThunk;
