
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import Main from '../components/main/Main';
import Info from '../components/info/Info';

class ProfileContainer extends React.Component {

  render() {
    console.log('ran before front');
    return (
      <div>
        <p>profile</p>
        <Head data={this.props.data}/>
        <Main data={this.props.data}/>
        <Info data={this.props.data}/>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = (state) => ({
  data: state.createProfileReducer
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
