// dispatches filter preferences

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from 'react-select/dist/react-select.css';
import toggleFilterCheckedThunk from '../../thunks/toggleFilterCheckedThunk';
import updateUserPrefThunk from '../../thunks/user_thunks/updateUserPrefThunk';

class FilterPrefContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      value: [],
      useFilters: this.props.defaultFilters
    };
  }

  handleChange(e) {
    const index = this.state.filters.indexOf(e.target.value);
    this.props.filterChange(e.target.value);
    if (!this.state.filters.includes(e.target.value)) {
      this.setState({filters: this.state.filters.concat(e.target.value)});
    } else {
      this.setState({filters: this.state.filters.slice(0, index).concat(this.state.filters.slice(index + 1))});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleSelectChange(value) {
    this.setState({value});
  }

  handleNew(event) {
    event.preventDefault();
    const options = this.state.value.split(',');
    const send = this.props.otherFilters.filter((filter) => (options.indexOf(filter.name) > -1));
    const newOne = this.state.useFilters.concat(send);
    // const newChecked = this.state.filters.concat(options);

    this.props.updateUser({preferences: this.props.preferences.concat(send)});
    this.setState({useFilters: newOne, value: []});
  }

  render() {
    console.log('filters', this.state.useFilters, this.state.filters);
    return (
      <div style={{clear: 'both', padding: '5%', paddingTop: '40px'}}>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {this.state.useFilters.map((filter, index) => (
            <p key={index}>
              <input type="checkbox" id={index}
              checked={(this.state.filters.includes(filter.name)) ? 'checked' : ''}
              value={filter.name}
              onChange={(e) => {this.handleChange(e);}}/>
              <label htmlFor={index} style={{color: 'black'}}># {filter.name}</label>
            </p>
            ))}
        </form>
        <form onSubmit={(e) => this.handleNew(e)}>
          <Select
            name="form-field-name"
            value={this.state.value}
            multi simpleValue
            options={this.props.otherFilters.map((tag) => {
              return {value: tag.name, label: '#' + tag.name};
            })}
            onChange={this.handleSelectChange.bind(this)}
          />
          <button type="submit">Add new filter</button>
        </form>
      </div>
    );
  }
}

FilterPrefContainer.propTypes = {
  defaultFilters: PropTypes.array,
  otherFilters: PropTypes.array,
  preferences: PropTypes.array,
  toggleChecked: PropTypes.func,
  getDiscoverData: PropTypes.func,
  updateUser: PropTypes.func,
  filterChange: PropTypes.func
};

const mapStateToProps = (state) => ({
  defaultFilters: state.discoverReducer.defaultFilters,
  otherFilters: state.discoverReducer.otherFilters,
  preferences: state.userReducer.preferences
});

const mapDispatchToProps = (dispatch) => ({
  toggleChecked: (name, index) => toggleFilterCheckedThunk(name, index)(dispatch),
  updateUser: (updateObj) => updateUserPrefThunk(updateObj)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPrefContainer);
