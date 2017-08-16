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
        <MyConversationContainer />
      </div>
    );
  }
}

RightSideBar.propTypes = {
  community: PropTypes.object
};

const mapStateToProps = (state) => ({
  community: state.userReducer.currentCommunity
});

export default connect(mapStateToProps)(RightSideBar);


