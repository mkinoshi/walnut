// dispatches filter preferences

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from 'react-select/dist/react-select.css';

class FilterPrefContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      value: [],
    };
  }

  componentDidMount() {
    this.props.getDiscoverData();
  }

  handleChange(e) {
    // this.props.toggleCheckedFront(e.target.value, index);
    // this.props.toggleChecked(e.target.value, index);
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
    this.props.updateUser({preferences: this.props.preferences.concat(this.state.value)});
    this.setState({value: []});
  }

  render() {
    console.log('filters', this.props.filters, this.props.preferences);
    return (
      <div style={{clear: 'both', padding: '5%', paddingTop: '40px'}}>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {this.props.filters.map((filter, index) => (
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
            options={this.props.filters.map((tag) => {
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
  filters: PropTypes.array,
  preferences: PropTypes.array,
  toggleChecked: PropTypes.func,
  getDiscoverData: PropTypes.func,
  updateUser: PropTypes.func,
  filterChange: PropTypes.func
};

const mapStateToProps = (state) => ({
  filters: state.discoverReducer.filters,
  preferences: state.userReducer.preferences
});

const mapDispatchToProps = (dispatch) => ({
  toggleChecked: (name, index) => dispatch({type: 'TOGGLE_FILTER_CHECKED', name: name, index: index}),
  getDiscoverData: () => dispatch({type: 'GET_DISCOVER_INFO'}),
  updateUser: (updateObj) => dispatch({type: 'UPDATE_USER', data: updateObj})
  // toggleCheckedFront: (name, index) => dispatch({type: 'TOGGLE_FILTER_FRONT', name: name, index: index})
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPrefContainer);
