import React from 'react';
import PropTypes from 'prop-types';
// import ProfileContainer from './containers/ProfileContainer';
import ContactList from './ContactList';

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
          <ContactList />
        </div>
    );
  }
}


Directory.propTypes = {
};

export default Directory;
