
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import Main from '../components/main/Main';
import Info from '../components/info/Info';

const dummyData = {
};

class ProfileContainer extends React.Component {

  render() {
    console.log('ran before front');
    return (
      <div>
        <p>profile</p>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
