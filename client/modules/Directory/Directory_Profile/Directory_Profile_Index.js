import React from 'react';
import PropTypes from 'prop-types';
import css from '../Directory.css';
import Header from './Directory_Profile_Header';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="ProfileContainer">
          <Header />
        </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object
};

export default Profile;
