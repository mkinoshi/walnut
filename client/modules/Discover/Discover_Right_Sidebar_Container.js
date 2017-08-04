import React from 'react';
import NewPostContainer from '../Feed/Feed_NewPost_Container';
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
       <div className="rightButtons">
          <Button className="rightModalButton" circular icon="plus" />
          <Button className="rightModalButton" circular icon="wechat" />
       </div>
        <NewPostContainer />
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


