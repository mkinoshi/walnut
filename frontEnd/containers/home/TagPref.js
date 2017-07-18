// dispatches filter preferences

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO Filter component box style
// TODO button onClick dispatches toggleChecked(index) 17

class TagPref extends React.Component {

  handleChange(e) {
    this.props.addTags(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {this.props.filters.map((filter, index) => (
            <div key={index}>
              <input type="checkbox" id={filter.name}
                checked={(this.props.tags.includes(filter.name)) ? 'checked' : ''}
                value={filter.name}
                onClick={(e) => {console.log('hi'); this.handleChange(e);}}
              />
              <label htmlFor={filter.name}># {filter.name}</label>
            </div>
            ))}
        </form>
      </div>
    );
  }
}

TagPref.propTypes = {
  filters: PropTypes.array,
  addTags: PropTypes.func,
  tags: PropTypes.array
};

const mapStateToProps = (state) => ({
  filters: state.discoverReducer.filters
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TagPref);


 // style={{float: 'left', clear: 'both', padding: '5%', paddingTop: '40'}}
