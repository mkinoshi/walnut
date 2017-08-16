import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConversationCard from './Discover_My_Conversations_Card';
import { Loader  } from 'semantic-ui-react';
import './Discover.css';
import firebaseApp from '../../firebase';
import _ from 'underscore';
import uuidv4 from 'uuid/v4';
import getMyConvosThunk from '../../thunks/user_thunks/getMyConvosThunk';

class MyConversationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    console.log('currentCom', this.props.currentCommunity);
    console.log('currentUser', this.props.currentUser);
    if (this.props.currentUser) {
      const followsRef = firebaseApp.database().ref('/follows/' + this.props.currentUser.firebaseId + '/' + this.props.currentCommunity);
      followsRef.on('value', (snapshot) => {
        console.log('firebase return', snapshot.val());
        if (snapshot.val()) {
          const follows = _.pairs(snapshot.val());
          // this will filter down to only those postIds which are mapped to true
          const myConvs = follows.filter((follow) => follow[1]).map((fol) => fol[0]);
          if (myConvs && myConvs.length > 0) {
            this.props.getConvos(myConvs);
          }
        }
      });
    }
  }

  render() {
    if (this.props.myConversations && this.props.myConversations.length > 0) {
      return (
        <div className="myConversationBox">
            <p>conversation box with infinite scroll</p>
            {this.props.myConversations.map((conv) =>
                <ConversationCard data={conv}
                                  key={uuidv4()}/>
            )}
        </div>
      );
    }
    return (
        <Loader active inline="centered" />
    );
  }
}

MyConversationContainer.propTypes = {
  myConversations: PropTypes.array,
  currentUser: PropTypes.object,
  currentCommunity: PropTypes.string,
  getConvos: PropTypes.func
};

const mapStateToProps = (state) => ({
  myConversations: state.conversationReducer.convos,
  currentCommunity: state.conversationReducer.current,
  currentUser: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
  getConvos: (convos) => getMyConvosThunk(convos)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyConversationContainer);


