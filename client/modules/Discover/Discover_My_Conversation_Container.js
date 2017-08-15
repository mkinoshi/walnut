import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  } from 'semantic-ui-react';
import './Discover.css';

class RightSideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      };
  }

  render() {
    return (
        <div className="myConversationBox">
            <p>conversation box with infinite scroll</p>
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


