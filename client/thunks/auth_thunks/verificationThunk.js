import firebase from 'firebase';

const verificationThunk = (email, password) => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result) => {
    return firebase.auth().currentUser.sendEmailVerification();
  })
  .then(() => {
    console.log('emial should be sent soon');
  })
  .catch(() => {
    console.log('this is error');
  });
};

export default verificationThunk;
