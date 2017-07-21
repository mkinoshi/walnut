
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from './Head';
import Main from '../components/main/Main';
import Info from '../components/Info';
import { Link} from 'react-router-dom';


class EditProfileContainer extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.saveProfile();
  }

  render() {
    return (
      <div>
        <p>profile</p>
        <Head />
        {/* <Main /> */}
        <Info />
          {this.props.isCreating ? <button onClick={() =>{this.handleClick();}}><Link to="/app">Done</Link></button> : null}
      </div>
    );
  }
}

EditProfileContainer.propTypes = {
  isCreating: PropTypes.bool,
  saveProfile: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  saveProfile: () => dispatch({type: 'CREATE_PROFILE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);
