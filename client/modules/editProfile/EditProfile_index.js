import React from 'react';
import PropTypes from 'prop-types';
import HeadContainer from './EditProfile_Head_Container';
import MainBody from './EditProfile_Main_Body';
import Info from './EditProfile_Info_Component';
import {Link} from 'react-router-dom';

const styles = {
  done: {
    margin: '40px',
    float: 'right'
  }
};


class EditProfile extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.props.isCreating ? <h1>Start creating your profile</h1> : <h1>Profile</h1>}
        <HeadContainer />
         <MainBody />
        <Info />
        {this.props.isCreating ? <button style={styles.done}><Link to="/app/walnuthome">Done</Link></button> : null}
      </div>
    );
  }
}

EditProfile.propTypes = {
  isCreating: PropTypes.bool,
};

export default EditProfile;

