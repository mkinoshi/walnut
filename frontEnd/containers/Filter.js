// dispatches filter preferences
// connect
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO Filter component box style
// TODO button onClick dispatches toggleChecked(index) 17

class Filter extends React.Component {


  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.filters.map((filter) => (
            <div><text>{filter.checked ? 'checked' : 'notChecked'}</text><text> {filter.name}</text></div>
          ))}
      </div>
    );
  }
}

Filter.propTypes = {
  filters: PropTypes.array
};

const mapStateToProps = (state) => ({
  filters: state.discoverReducer.filters
});

const mapDispatchToProps = (dispatch) => ({
  toggleChecked: (index) => dispatch({type: 'TOGGLE_FILTER_CHECKED', index: index})
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
