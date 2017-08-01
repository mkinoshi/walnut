
import firebase from 'firebase';
const URL = 'http://localhost:3000/';

const googleLoginThunk = (email, password) => (dispatch) => {
	var provider = new firebase.auth.GoogleAuthProvider();
    console.log('got here');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('google login worked', user);
    }).catch(function(error) {
      console.log('google login failed', error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};
export default googleLoginThunk;
