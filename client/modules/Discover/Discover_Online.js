// shows who is online

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebaseApp from '../../firebase';
import { Icon, Label, Image, Item } from 'semantic-ui-react';
import "./Discover.css";

class Online extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        people: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const realThis = this;
    if (nextProps.user.pictureURL) {
        firebaseApp.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('curr user', user, user.displayName, user.uid);
                console.log('nextProps', nextProps);
                const amOnline = firebaseApp.database().ref('.info/connected');
                const userRef = firebaseApp.database().ref('/presence/' + nextProps.user.currentCommunity._id + '/' + user.uid);
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
                if (!realThis.props.user.pictureURL) {
                    console.log('inside componentWillReceiveProps', nextProps);
                    const allUser = firebaseApp.database().ref('/presence/' + nextProps.user.currentCommunity._id);
                    allUser.on('value', snapshot => {
                        console.log('allUsers', snapshot.val());
                        realThis.setState({people: Object.values(snapshot.val())});
                    })
                }
                else {
                    console.log('this.props is not empty', realThis.props);
                    const allUser = firebaseApp.database().ref('/presence/' + realThis.props.user.currentCommunity._id);
                    allUser.on('value', snapshot => {
                        console.log('allUsers', snapshot.val());
                        realThis.setState({people: Object.values(snapshot.val())});
                    })
                }
            }
          });
    }
  }

  componentDidMount() {
    if (this.props.user.pictureURL) {
        const realThis = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('inside componentdidMount', realThis.props);
                const allUser = firebaseApp.database().ref('/presence/' + realThis.props.user.currentCommunity._id);
                allUser.on('value', snapshot => {
                    console.log('allUsers', snapshot.val());
                    realThis.setState({people: Object.values(snapshot.val())});
                })
            }
          });
    }
  }


  render() {
    console.log('user info', this.state.people);
    return (
      <div className="LeftSidebar_Online">
        <div className="discoverTitleBox">
            <h1 className="discoverTitle">Currently Active</h1>
            <div className="discoverTitleLine"></div>
            <Item.Group>
                {this.state.people.map(person => (
                    <Item>
                        <Item.Content verticalAlign="middle">
                                <div className="imageWrapperOnline">
                                    <img className="postUserImage" src={person.pictureURL} />
                                </div>
                            <div className="onlineName">{person.name}</div>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </div>
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
