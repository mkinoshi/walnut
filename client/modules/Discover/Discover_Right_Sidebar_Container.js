import React from 'react';
import MyConversationContainer from './Discover_My_Conversation_Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import './Discover.css';

class RightSideBar extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="RightSideBar_Container">
        <div className="discoverTitleBox">
          <h1 className="discoverTitle">My conversations</h1>
          <div className="discoverTitleLine"></div>
        </div>
        {this.props.currentCommunity && this.props.currentUser.firebaseId ? <MyConversationContainer /> : null}
      </div>
    );
  }
}

RightSideBar.propTypes = {
  currentCommunity: PropTypes.string,
  currentUser: PropTypes.object
};

const mapStateToProps = (state) => ({
  currentUser: state.userReducer,
  currentCommunity: state.conversationReducer.current
});

export default connect(mapStateToProps)(RightSideBar);


