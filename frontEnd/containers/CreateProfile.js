import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CreateProfile extends React.Component {

  render() {
    return (
        <div>
          <p>I am the create profile</p>
        </div>
    );
  }
}


CreateProfile.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
