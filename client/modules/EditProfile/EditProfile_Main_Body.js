import React from 'react';
import PropTypes from 'prop-types';
import StoryContainer from './EditProfile_Main_Body_Story_Container';
import PortfolioContainer from './EditProfile_Main_Body_Portfolio_Container';

const styles = {
  main: {
    width: '80%',
    paddingLeft: '30px',
  }
};

class MainBody extends React.Component {

  render() {
    return (
      <div className="col-xs-6" style={styles.main}>
        <PortfolioContainer />
        <StoryContainer />
      </div>
    );
  }
}

MainBody.propTypes = {
};

export default MainBody;
