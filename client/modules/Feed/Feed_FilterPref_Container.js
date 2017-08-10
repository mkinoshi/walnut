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
    let val = false;
    if (this.state.useFilters.length > 0) {
      this.state.useFilters.forEach((filter) => {
        if (options.indexOf(filter.name) > -1) {
          val = true;
        }
      });
    }
    return val;
  }

  handleSelectChange(value) {
    if (value) {
      const options = value.split(',');
      const send = this.props.otherFilters.filter((filter) => (options.indexOf(filter.name) > -1));
      console.log(this.props.otherFilters);
      console.log(this.state.useFilters);
      console.log(options);
      if (!this.isPrefSelected(options)) {
        this.props.toggleTempChecked(send.map((filt) => filt._id));
        this.setState({useFilters: this.state.useFilters.concat(send)});
      }
    }
  }

  selectOptions() {
    if(this.props.isFetching) {
      return null;
    }
    if(!this.props.defaultFilters) {
      return null;
    }
    if(this.state.useFilters.length === 0) {
      return this.props.otherFilters.map((tag) => {
        return { value: tag.name, label: '#' + tag.name };
      });
    }
    function findWithAttr(array, attr, value) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }
    const indxs = this.state.useFilters.map((filter) => findWithAttr(this.props.otherFilters, 'name', filter.name));
    const arrFilt = this.props.otherFilters.slice();
    indxs.forEach((indx) => arrFilt.splice(indx, 1));
    return arrFilt.map((tag) => {
      return {value: tag.name, label: '#' + tag.name};
    });
  }

  checkedBoxTagAdd(id) {
    if (this.props.communityPreference.includes(id)) {
      return 'checked';
    }
    // let useCheck = false;
    // if(this.state.useFilters.length > 0) {
    //   for (let i = 0; i < this.state.useFilters.length; i++) {
    //     if (this.state.useFilters[i]._id === id) {
    //       useCheck = true;
    //     }
    //   }
    // }
    // if(useCheck) {
    //   return 'checked';
    // }
    return '';
  }

  render() {
    const filters = this.props.defaultFilters ? this.props.defaultFilters.concat(this.state.useFilters) : null;
    const options = this.selectOptions();
    const checked = this.props.defaultFilters ? filters.map((filter) => this.checkedBoxTagAdd(filter._id)) : null;
    console.log(checked);
    return (
      <div style={{clear: 'both', padding: '5%', paddingTop: '20px'}}>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {filters ?
            filters.map((filter, index) => (
                <p key={index}>
                  <input type="checkbox" id={index}
                    checked={checked[index]}
                    value={filter.name}
                    onChange={() => { console.log('I am toggling here', filter); this.props.toggleChecked(filter._id); }} />
                  <label htmlFor={index} className="tagItemLabel" ># {filter.name}</label>
                </p>
              ))
           :
            null
          }
        </form>
        <form>
          <Select
            name="form-field-name"
            value={this.state.value}
            multi simpleValue
            placeholder="Add new filter"
            options={options}
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
  communityPreference: PropTypes.array,
  toggleChecked: PropTypes.func,
  getDiscoverData: PropTypes.func,
  updateUser: PropTypes.func,
  filterChange: PropTypes.func,
  toggleTempChecked: PropTypes.func,
  isFetching: PropTypes.bool
};

const mapStateToProps = (state) => ({
  defaultFilters: state.discoverReducer.defaultFilters,
  otherFilters: state.discoverReducer.otherFilters,
  isFetching: state.discoverReducer.isFetching,
  communityPreference: state.userReducer.communityPreference
});

const mapDispatchToProps = (dispatch) => ({
  toggleChecked: (id) => dispatch(toggleFilterCheckedThunk(id)),
  toggleTempChecked: (useFilters) => dispatch(toggleTempFilterCheckedThunk(useFilters)),
  updateUser: (updateObj) => updateUserPrefThunk(updateObj)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPrefContainer);
