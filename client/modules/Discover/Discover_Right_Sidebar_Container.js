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
      <div className="RightSideBar_Container">
        <div className="RightSideBar_LogoContainer">
          {/* <div id="Logo" className="RightSideBar"><img src={this.props.community.icon} /></div>
          <div id="title" className="RightSideBar">><h1 className="discover" >{this.props.community.title}</h1></div> */}
        </div>
        <div className="RightSideBar_Preference">
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


