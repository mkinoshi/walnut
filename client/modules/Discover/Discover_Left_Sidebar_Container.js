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

  filterChange(filterName) {
    const filts = this.props.filters;
    if (filts.indexOf(filterName) >= 0) {
      const idx = filts.indexOf(filterName);
      filts.splice(idx, 1);
    } else {
      filts.push(filterName);
    }
    // this.setState({filters: filts});
    this.props.changeFilters(filts);
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
  community: PropTypes.object,
  filters: PropTypes.array,
  changeFilters: PropTypes.func
};

const mapStateToProps = (state) => ({
  filters: state.discoverReducer.filters,
  community: state.userReducer.currentCommunity
});

const mapDispatchToProps = (dispatch) => ({
  changeFilters: (filts) => {
    dispatch({type: 'CHANGE_FILTERS', filters: filts});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar);


