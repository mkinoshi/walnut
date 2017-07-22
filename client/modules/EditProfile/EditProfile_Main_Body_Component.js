import React from 'react';
import PropTypes from 'prop-types';
import StoryContainer from './EditProfile_Main_Body_Story_Container';
import PortfolioContainer from './EditProfile_Main_Body_Portfolio_Container';


class MainBody extends React.Component {

  render() {
    return (
      <div>
        <p>Main</p>
        <StoryContainer />
        <PortfolioContainer />
      </div>
    );
  }
}

MainBody.propTypes = {
};

export default MainBody;
