import firebaseApp from '../../firebase';
import axios from 'axios';
const URL = 'http://localhost:3000';

const emailRegistrationThunk = (firstname, lastname, email, password) => (dispatch) => {
  dispatch({type: 'USER_IS_NOT_CREATED'});
  firebaseApp.auth().createUserWithEmailAndPassword(email, password)
  .then((result) => {
    result.getToken(/* forceRefresh */ true)
    .then(function(idToken) {
      console.log('idToken', idToken);
      axios.post(URL + '/auth/signup', {
        token: idToken,
        fname: firstname,
        lname: lastname,
        email: email,
        password: password
      })
      .then((res) => {
        console.log(res);
        dispatch({type: 'USER_IS_CREATED'});
      })
      .catch(function(error) {
        console.log('axios did not go through');
      });
    }).catch(function(error) {
      console.log('could not get token', error);
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('firebase error', error);
    // ...
  });
	// need to create a backend route to create user:
	// var new_user = new User({
 //        fullName: req.body.fname + ' ' + req.body.lname,
 //        username: req.body.username,
 //        password: req.body.password,
 //        preferences: req.body.tags,
 //        portfolio: [
 //          {name: 'media', data: []},
 //          {name: 'documents', data: []},
 //          {name: 'code', data: []},
 //          {name: 'design', data: []}
 //        ],
 //
 //        pictureURL: 'https://s3-us-west-1.amazonaws.com/walnut-test/430-512.png'
 //      });
 //      return new_user.save()
 //      .then((doc) => {
 //        // console.log(doc);
 //        res.status(200);
 //        res.redirect('/')
 //      })
 //      .catch((err) => {
 //        console.log(err);
 //      })
 //    }
};
export default emailRegistrationThunk;
