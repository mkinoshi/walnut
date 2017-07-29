/**
 * Created by ebadgio on 7/26/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

class YearSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'first'
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.handleSelect(event.target.value);
  }

  render() {
    const Year = parseInt(this.props.year, 10);
    return (
        <select value={this.state.value} onChange={(e) => this.handleChange(e)} style={{'display': 'block'}}>
            <option value="first">Year:</option>
            {_.range(Year, 2027).map((year) => <option value={year}>{year}</option>)}
        </select>
    );
  }
}

YearSelect.propTypes = {
  year: PropTypes.string,
  handleSelect: PropTypes.func
};

export default YearSelect;
