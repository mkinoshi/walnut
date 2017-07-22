import React from 'react';
import PropTypes from 'prop-types';
import HeadContainer from './EditProfile_Head_Container';
// import MainBody from './EditProfile_Main_Body_Container';
import Info from './EditProfile_Info_Component';


class EditProfile extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.props.isCreating ? <h1>Start creating your profile</h1> : <h1>Profile</h1>}
        <HeadContainer />
        {/* <MainBody /> */}
        <Info />
      </div>
    );
  }
}

EditProfile.propTypes = {
  isCreating: PropTypes.bool,
};

export default EditProfile;

