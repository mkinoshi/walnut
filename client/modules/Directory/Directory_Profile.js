import React from 'react';
import PropTypes from 'prop-types';

// structure:
// user data objects are retrieved and held in the store upon mounting
// each individual component of profile page receives info as prop
// profile makes a call to store and passes info down to components



class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div>
        <p>Name: {this.props.user.head.fullName}</p>
        <p>{this.props.user.head.tags}</p>
        <p>{this.props.user.head.blurb}</p>
        <img src={this.props.user.head.profileURL}/>
        </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object
};

export default Profile;
