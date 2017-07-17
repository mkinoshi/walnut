// dispatches filter preferences

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO Filter component box style
// TODO button onClick dispatches toggleChecked(index) 17
// TODO pre define checked box from filter.checked

class FilterPref extends React.Component {

  handleChange(e) {
    this.props.filterChange(e.target.value);
    this.props.toggleChecked(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    console.log(this.props);
    return (
      <div style={{float: 'left', clear: 'both', padding: '5%', paddingTop: '40'}}>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {this.props.filters.map((filter) => (
            <p>
              <input type="checkbox" id={filter.name}
              checked={(filter.checked) ? 'checked' : ''}
              value={filter.name}
              onChange={(e) => (this.handleChange(e))}/>
              <label htmlFor={filter.name}># {filter.name}</label>
            </p>
            ))}
        </form>
      </div>
    );
  }
}

FilterPref.propTypes = {
  filters: PropTypes.array,
  filterChange: PropTypes.func,
  toggleChecked: PropTypes.func
};

const mapStateToProps = (state) => ({
  filters: state.discoverReducer.filters
});

const mapDispatchToProps = (dispatch) => ({
  // filter.name
  toggleChecked: (name) => dispatch({type: 'TOGGLE_FILTER_CHECKED', name: name})
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPref);
