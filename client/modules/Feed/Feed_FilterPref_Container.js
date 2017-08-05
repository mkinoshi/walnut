// dispatches filter preferences

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from 'react-select/dist/react-select.css';
import toggleFilterCheckedThunk from '../../thunks/toggleFilterCheckedThunk';
import updateUserPrefThunk from '../../thunks/user_thunks/updateUserPrefThunk';
import toggleTempFilterCheckedThunk from '../../thunks/toggleTempFilterCheckedThunk';

class FilterPrefContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      value: [],
      useFilters: []
    };
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
        this.setState({useFilters: this.state.useFilters.concat(send)});
        const id = send[0]._id;
        this.props.toggleTempChecked(id);
      }
    }
  }

  render() {
    console.log(this.state, this.props);
    const filters = this.props.defaultFilters.concat(this.state.useFilters);
    return (
      <div style={{clear: 'both', padding: '5%', paddingTop: '20px'}}>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {filters.map((filter, index) => (
            <p key={index}>
              <input type="checkbox" id={index}
              checked={(this.props.preferences.includes(filter._id)) ? 'checked' : ''}
              value={filter.name}
              onChange={() => { this.props.toggleChecked(filter._id);}}/>
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
  filterChange: PropTypes.func,
  toggleTempChecked: PropTypes.func
};

const mapStateToProps = (state) => ({
  defaultFilters: state.discoverReducer.defaultFilters,
  otherFilters: state.discoverReducer.otherFilters,
  preferences: state.userReducer.preferences
});

const mapDispatchToProps = (dispatch) => ({
  toggleChecked: (id) => dispatch(toggleFilterCheckedThunk(id)),
  toggleTempChecked: (id) => dispatch(toggleTempFilterCheckedThunk(id)),
  updateUser: (updateObj) => updateUserPrefThunk(updateObj)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPrefContainer);
