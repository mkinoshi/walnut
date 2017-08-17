// shows who is online

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebaseApp from '../../firebase';
import { Icon, Label, Image } from 'semantic-ui-react';

class Online extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        people: []
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
                realThis.setState({people: Object.values(snapshot.val())});
            })
        }
      });
  }


  render() {
    return (
      <div>
          <div style={{color: 'black'}}>Online</div>
          {this.state.people.map(person => (
            <span>
                <Image src={person.pictureURL} shape="circular" size="tiny"/>
                {person.name}
            </span>
          ))}
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
