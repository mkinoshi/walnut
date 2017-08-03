import React from 'react';
import NewPostContainer from '../Feed/Feed_NewPost_Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilterPrefContainer from '../Feed/Feed_FilterPref_Container';

import './Discover.css';
class LeftSideBar extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="LeftSidebar_Container col-xs-3">
        <div className="LeftSideBar_LogoContainer">
          <div className="LeftSideBar_Logo"><img className="discoverImage" src={this.props.community.icon} /></div>
          <div className="LeftSideBar_title"><h1 className="discoverTitle">{this.props.community.title}</h1></div>
        </div>
        <div className="LeftSideBar_Preference">
          <div>
             <div className="outerTitle"><p className="outeritem">Topic Preference</p></div>
             <FilterPrefContainer filterChange={(name) => (this.filterChange(name))}/>
          </div>
        </div>
      </div>
    );
  }
}

LeftSideBar.propTypes = {
  community: PropTypes.object
};

const mapStateToProps = (state) => ({
  community: state.userReducer.currentCommunity
});

export default connect(mapStateToProps)(LeftSideBar);


