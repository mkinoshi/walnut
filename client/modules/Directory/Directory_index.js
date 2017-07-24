import React from 'react';
import PropTypes from 'prop-types';
import DeckContainer from './Directory_Deck_Container';
import Profile from './Directory_Profile';


// TODO needs to call deck container and profile container
// TODO profile only dispatches different search actions

const styles = {
  header: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  },
  page: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  profile: {
    flex: 3,
    backgroundColor: 'red',
  }
};

class Directory extends React.Component {

  render() {
    console.log('made it to directory');
    return (

        <div style={styles.page}>
          <DeckContainer style={styles.container}/>
          <Profile style={styles.profile}/>
        </div>
    );
  }
}


Directory.propTypes = {
};

export default Directory;
