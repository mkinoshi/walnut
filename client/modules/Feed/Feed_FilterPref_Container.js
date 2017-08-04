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
      useFilters: []
    };
  }

  handleChange(e) {
    console.log('this is it');
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

  isPrefSelected(options) {
    console.log('00000000');
    let val = false;
    if (this.state.useFilters.length > 0) {
      console.log('11111111', this.state.useFilters);
      this.state.useFilters.forEach((filter) => {
        console.log('222222', filter, options);
        if (options.indexOf(filter.name) > -1) {
          console.log('3333333');
          val = true;
        }
      });
    }
    return val;
  }

  handleSelectChange(value) {
    console.log('dddddddd', this.state.filters);
    console.log('hereeeeeeeeeeee', value);
    if (value) {
      const options = value.split(',');
      console.log('booooooool', this.isPrefSelected(options));
      const send = this.props.otherFilters.filter((filter) => (options.indexOf(filter.name) > -1));
      if (!this.isPrefSelected(options)) {
        const newOne = this.state.useFilters.length > 0 ? this.state.useFilters.concat(send) : this.props.defaultFilters.concat(send);
        this.props.updateUser({ preferences: this.props.preferences.concat(send) });
        this.setState({ useFilters: newOne, value: [] });
      } else {
        this.setState({ value: [] });
      }
    } else {
      this.setState({value: []});
    }
  }

  render() {
    console.log(this.state);
    const filters = this.state.useFilters.length > 0 ? this.state.useFilters : this.props.defaultFilters;
    return (
      <div style={{clear: 'both', padding: '5%', paddingTop: '20px'}}>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {filters.map((filter, index) => (
            <p key={index}>
              <input type="checkbox" id={index}
              checked={(this.state.filters.includes(filter.name)) ? 'checked' : ''}
              value={filter.name}
              onChange={(e) => {this.handleChange(e);}}/>
              <label htmlFor={index} className="tagItemLabel" ># {filter.name}</label>
            </p>
            ))}
        </form>
        <form>
          <Select
            name="form-field-name"
            value={this.state.value}
            multi simpleValue
            placeholder="Add new filter"
            options={this.props.otherFilters.map((tag) => {
              return {value: tag.name, label: '#' + tag.name};
            })}
            onChange={this.handleSelectChange.bind(this)}
          />
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
