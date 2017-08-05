
import firebase from 'firebase';
import axios from 'axios';
const URL = 'http://localhost:3000/';

const signInThunk = (email, password) => (dispatch) => {
  console.log('got in the thunk');
  dispatch({type: 'USER_IS_NOT_CREATED'});
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(result => {
    result.getToken(/* forceRefresh */ true)
    .then(function(idToken) {
      console.log('idToken', idToken);
      axios.post(URL + 'auth/login', {
        token: idToken,
        email: email,
        password: password
      })
      .then((res) => {
        console.log(res);
        dispatch({type: 'USER_IS_CREATED'});
      });
    })
  .catch(function(error) {
    // Handle Errors here.
    console.log('you got a fucking error', error);
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
  });
};

export default signInThunk;
