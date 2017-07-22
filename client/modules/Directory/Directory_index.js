import React from 'react';
import PropTypes from 'prop-types';
// import DeckContainer from './Directory_Deck_Container';


// TODO needs to call deck container and profile container
// TODO profile only dispatches different search actions

const styles = {
  header: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class Directory extends React.Component {

  render() {
    return (
        <div>
          <h1 style={styles.header}>I am the directory</h1>
          {/* <DeckContainer />*/}
        </div>
    );
  }
}


Directory.propTypes = {
};

export default Directory;
