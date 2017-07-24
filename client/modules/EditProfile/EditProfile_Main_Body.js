import React from 'react';
import PropTypes from 'prop-types';
import StoryContainer from './EditProfile_Main_Body_Story_Container';
import Portfolio from './EditProfile_Main_Body_Portfolio';


class MainBody extends React.Component {

  render() {
    return (
      <div>
        <p>Main</p>
        <StoryContainer />
        <Portfolio />
      </div>
    );
  }
}

MainBody.propTypes = {
};

export default MainBody;
