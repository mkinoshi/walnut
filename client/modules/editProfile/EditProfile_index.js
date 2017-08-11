import React from 'react';
import PropTypes from 'prop-types';
import HeadContainer from './EditProfile_Head_Container';
import MainBody from './EditProfile_Main_Body';
import Info from './EditProfile_Info';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import createProfileThunk from '../../thunks/profile_thunks/createProfileThunk';

const styles = {
  done: {
    margin: '40px',
    float: 'right'
  },
  content: {
    display: 'flex',
  }
};


class EditProfileContainer extends React.Component {
  constructor() {
    super();
    this.create = this.create.bind(this);
  }

  create() {
    this.props.createProfile();
  }

  render() {
    return (
      <div>
        {this.props.isCreating ? <h1 style={styles.content}>Start creating your profile</h1> : <h1 style={styles.content}>Profile</h1>}
        <div className="row col-xs-12" style={styles.content}>
          <HeadContainer />
        </div>
        <div className="row col-xs-12" style={styles.content}>
          <Info />
          <MainBody />
        </div>
        {this.props.isCreating ? <button onClick={() => {this.create();}} style={styles.done}><Link to="/walnuthome">Done</Link></button> : null}
      </div>
    );
  }
}

EditProfileContainer.propTypes = {
  isCreating: PropTypes.bool,
  createProfile: PropTypes.func,
  getUser: PropTypes.func
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  createProfile: () => dispatch(createProfileThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);

