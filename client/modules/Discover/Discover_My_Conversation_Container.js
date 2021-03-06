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
    if (this.props.currentUser) {
      const followsRef = firebaseApp.database().ref('/follows/' + this.props.currentUser.firebaseId + '/' + this.props.currentCommunity);
      followsRef.on('value', (snapshot) => {
        if (snapshot.val()) {
          const follows = _.pairs(snapshot.val());
          // this will filter down to only those postIds which are mapped to true
          const myConvs = follows.filter((follow) => follow[1]).map((fol) => fol[0]);
          if (myConvs) {
            this.props.getConvos(myConvs);
            this.props.addIds(myConvs);
          }
        }
      });
    }
  }

  render() {
    if (this.props.myConversations && this.props.myConversations.length > 0) {
      return (
        <div className="myConversationBox">
            {this.props.myConversations.map((conv) =>
                <ConversationCard data={conv}
                                  key={uuidv4()}
                                  user={this.props.currentUser}/>
            )}
        </div>
      );
    }
    return (
        <div className="myConversationBox">
          <p>conversation box with infinite scroll</p>
        </div>
    );
  }
}

MyConversationContainer.propTypes = {
  myConversations: PropTypes.array,
  currentUser: PropTypes.object,
  currentCommunity: PropTypes.string,
  getConvos: PropTypes.func,
  addIds: PropTypes.func
};

const mapStateToProps = (state) => ({
  myConversations: state.conversationReducer.convos,
  currentCommunity: state.conversationReducer.current,
  currentUser: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
  getConvos: (convos) => getMyConvosThunk(convos)(dispatch),
  addIds: (iDs) => dispatch({type: 'ADD_IDS', iDs: iDs})
});

export default connect(mapStateToProps, mapDispatchToProps)(MyConversationContainer);


