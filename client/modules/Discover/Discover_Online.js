// shows who is online

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebaseApp from '../../firebase';
import { Icon, Label } from 'semantic-ui-react';

class Online extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    const realThis = this;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('curr user', user, user.displayName, user.uid);
            const amOnline = firebaseApp.database().ref('.info/connected');
            const userRef = firebaseApp.database().ref('/presence/' + user.uid);
            const allUser = firebaseApp.database().ref('/presence/');
            amOnline.on('value', snapshot => {
              if (snapshot.val()) {
                console.log('hallelujah', snapshot.val());
                userRef.onDisconnect().remove();
                userRef.set({
                    name: user.displayName,
                    pictureURL: nextProps.user.pictureURL
                });
              }
            });
            allUser.on('value', snapshot => {
                console.log('allUsers', snapshot.val());
            })
            // const messagesRef = firebaseApp.database().ref('/messages/' + data.postId).orderByKey()
            // .endAt(this.state.firstKey).limitToLast(15);
            const users = firebaseApp.database().ref('/presence/');
            console.log('pickles', users);
        } else {
          // No user is signed in.
        }
      });
  }


  render() {
    return (
      <div>
          <div style={{color: 'black'}}>Online</div>
          {/* array.map */}
      </div>
    );
  }
}

Online.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = (state) => ({
    user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Online);
