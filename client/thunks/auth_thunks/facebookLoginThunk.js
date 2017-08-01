
import firebase from 'firebase';
const URL = 'http://localhost:3000/';

const facebookLoginThunk = (email, password) => (dispatch) => {
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    console.log('firebase error', error);
	    // ...
	 });
};
export default facebookLoginThunk;
