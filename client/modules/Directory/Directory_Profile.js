import React from 'react';
import PropTypes from 'prop-types';

// structure:
// user data objects are retrieved and held in the store upon mounting
// each individual component of profile page receives info as prop
// profile makes a call to store and passes info down to components

const styles = {
  header: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  },
  page: {
    display: 'flex',
    flexDirection: 'row'
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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.user);
    if (this.props.user) {
      return (
        <div style={styles.profile}>
          <h1> I am the Profile </h1>
          <p>Name: {this.props.user.fullName}</p>
          <p>{this.props.user.tags}</p>
          <img src={this.props.user.pictureURL}/>
        </div>
      );
    } return (
        <div style={styles.profile}>
          <h1> I am the Profile </h1>
        </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object
};

export default Profile;
