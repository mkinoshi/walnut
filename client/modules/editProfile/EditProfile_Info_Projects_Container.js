import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
  projects: {
    backgroundColor: 'lightblue',
    width: '65%',
    paddingLeft: '2%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class ProjectsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div style={styles.projects}>
        <p>Projects</p>
      </div>
    );
  }
}

ProjectsContainer.propTypes = {
  projects: PropTypes.array
};

const mapStateToProps = (state) => ({
  projects: state.createProfileReducer.info.projects
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
