import { firebaseApp } from '../../firebase';
const URL = 'http://localhost:3000/';

const emailRegistrationThunk = (firstname, lastname, email, password) => (dispatch) => {
  firebaseApp.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('successfully registered on firebase');
	// firebase.auth().onAuthStateChanged(function(user) {
	// 	axios.post(URL + 'auth/createUser', {user.uid, firstname, lastname, email, password})
	// 	.then(() => {
	// 		//redirect to homepage
	// 	})
	// });
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
 //        email: req.body.email,
 //        username: req.body.username,
 //        password: req.body.password,
 //        preferences: req.body.tags,
 //        portfolio: [
 //          {name: 'media', data: []},
 //          {name: 'documents', data: []},
 //          {name: 'code', data: []},
 //          {name: 'design', data: []}
 //        ],
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
