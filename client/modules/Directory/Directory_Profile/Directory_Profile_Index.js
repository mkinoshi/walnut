import React from 'react';
import PropTypes from 'prop-types';
import css from '../Directory.css';



class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.user) {
      return (
        <div className="ProfileContainer">

        </div>
      );
    } return (
        <div className="ProfileContainer">
          <h1> I am the Profile </h1>
        </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object
};

export default Profile;
