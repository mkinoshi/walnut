
import firebase from 'firebase';
const URL = 'http://localhost:3000/';

const signInThunk = (email, password) => (dispatch) => {
	firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('user was logged in', user);
        // if(req.user.hasProfile) {
        //   if (req.user.currentCommunity) {
        //       User.findById(req.user._id)
        //           .populate('currentCommunity')
        //           .then((user) => {
        //               const url = '/app/community/' + user.currentCommunity.title.split(' ').join('') + '/discover';
        //               res.redirect(url);
        //           })
        //   }
        //   else {
        //     res.redirect('/app/walnuthome')
        //   }
        // } else{
        //   res.redirect('/app/editprofile');
        // }
      } else {
        console.log('user not validated');
      }
    });
};
export default signInThunk;
