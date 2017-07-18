import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Directory extends React.Component {

  render() {
    return (
        <div>
          <p>I am the directory</p>
        </div>
    );
  }
}


Directory.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
