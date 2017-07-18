// dispatches filter preferences

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO Filter component box style
// TODO button onClick dispatches toggleChecked(index) 17
// TODO pre define checked box from filter.checked

class FilterPref extends React.Component {

  handleChange(e, index) {
    // this.props.toggleCheckedFront(e.target.value, index);
    this.props.toggleChecked(e.target.value, index);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    console.log('ran before front');
    return (
      <div style={{float: 'left', clear: 'both', padding: '5%', paddingTop: '40px'}}>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {this.props.filters.map((filter, index) => (
            <p key={index}>
              <input type="checkbox" id={index}
              checked={(filter.checked) ? 'checked' : ''}
              value={filter.name}
              onClick={(e) => {console.log('onclick', filter.checked); this.handleChange(e, index);}}/>
              <label htmlFor={index}># {filter.name}</label>
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
  toggleChecked: (name, index) => dispatch({type: 'TOGGLE_FILTER_CHECKED', name: name, index: index}),
  // toggleCheckedFront: (name, index) => dispatch({type: 'TOGGLE_FILTER_FRONT', name: name, index: index})
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPref);
