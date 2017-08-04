import React from 'react';
import NewPostContainer from '../Feed/Feed_NewPost_Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Discover.css';

class RightSideBar extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="RightSideBar_Container col-xs-4">
        <div className="newPost_Container">
          <NewPostContainer />
        </div>
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


