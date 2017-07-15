import React from 'react';
import FilterPref from '../../containers/FilterPref';
import Feed from '../../containers/Feed';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Discover extends React.Component {

  componentDidMount() {
    this.props.stateRefresh();
  }

  render() {
    return (
      <div>
        <FilterPref />
        <Feed />
      </div>
    );
  }
}

Discover.propTypes = {
  stateRefresh: PropTypes.func,
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  stateRefresh: () => dispatch({type: 'STATE_REFRESH'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
