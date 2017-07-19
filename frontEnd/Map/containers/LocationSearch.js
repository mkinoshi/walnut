import React from 'react';
import PropTypes from 'prop-types';
import GoogleLocations from 'google-locations';
import {Search, Grid, Header} from 'semantic-ui-react';

const locations = new GoogleLocations(process.env.LOCATION_API);

class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: '',
      results: ''
    };
  }

  handleSearchChange(e) {
    console.log(e.target.value);
    this.setState({value: e.target.value});
    // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' + process.env.LOCATION_API)
    // .then((response) => {
    //   console.log(response);
    // });
    locations.autocomplete({input: this.state.value, types: '(cities)'}, function(err, response) {
      console.log('search: ', response);
    });
  }

  render() {
    return (
      <Search
        loading={this.state.isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={(e) => this.handleSearchChange(e)}
        results={this.state.results}
        value={this.state.value}
        {...this.props}
      />
    );
  }
}

export default LocationSearch;
