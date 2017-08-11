
import firebase from 'firebase';
import axios from 'axios';
import URL from '../../info';

const signOutThunk = (history) => (dispatch) => {
  firebase.auth().signOut()
  .then(() => {
    localStorage.removeItem('tab');
    localStorage.removeItem('url');
    localStorage.removeItem('isUserInCommunity');
    localStorage.removeItem('home');
    sessionStorage.removeItem('url');
    sessionStorage.removeItem('tab');
    return axios.post('/auth/logout');
  })
  .then(() => {
    dispatch({type: 'LOGOUT_DONE'});
    history.replace('/login');
  })
  .catch(function(error) {
    // Handle Errors here.
    console.log('you got a fucking error', error);
    const errorCode = error.code;
    const errorMessage = error.message;
    dispatch({type: 'LOGOUT_ERROR'});
    // ...
  });
};

export default signOutThunk;
