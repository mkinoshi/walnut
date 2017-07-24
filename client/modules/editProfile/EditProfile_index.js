import React from 'react';
import PropTypes from 'prop-types';
import HeadContainer from './EditProfile_Head_Container';
import MainBody from './EditProfile_Main_Body';
import Info from './EditProfile_Info_Component';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

const styles = {
  done: {
    margin: '40px',
    float: 'right'
  }
};


class EditProfileContainer extends React.Component {
  constructor() {
    super();
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
  }

  create() {
    this.props.createProfile();
  }

  render() {
    return (
      <div>
        {this.props.isCreating ? <h1>Start creating your profile</h1> : <h1>Profile</h1>}
        <HeadContainer />
         <MainBody />
        <Info />
        {this.props.isCreating ? <button onClick={() => {this.create();}} style={styles.done}><Link to="/app/walnuthome">Done</Link></button> : null}
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
  createProfile: () => dispatch({type: 'CREATE_PROFILE'}),
  getUser: () => dispatch({type: 'GET_USER_DATA'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);

