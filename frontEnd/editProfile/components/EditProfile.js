
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from './Head';
import Main from './main/Main';
import Info from './Info';

class EditProfile extends React.Component {

  render() {
    return (
      <div>
        <p>profile</p>
        <Head />
        {/* <Main /> */}
        <Info />
      </div>
    );
  }
}

EditProfile.propTypes = {
};

export default EditProfile;
