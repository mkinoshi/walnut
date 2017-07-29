import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.onChange = (address) => this.setState({ address });
  }

  handleFormEnter(event) {
    // event.preventDefault();
    console.log(event);
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.updateCenter([latLng.lng, latLng.lat]);
        this.props.updateZoom(10);
      })
      .catch(error => console.error('Error', error));
  }



  handleFormSubmit(event) {
    // event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // console.log('here', latLng);
        this.props.updateCenter([latLng.lng, latLng.lat]);
      })
      .catch(error => console.error('Error', error));
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Enter location'
    };
    const cssClasses = {
      autocompleteContainer: 'my-autocomplete-container'
    };

    return (
        <PlacesAutocomplete classNames={cssClasses} inputProps={inputProps} onSelect={this.handleFormSubmit.bind(this)} />
    );
  }
}

LocationSearch.propTypes = {
  updateCenter: PropTypes.func,
  updateZoom: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  updateCenter: (newCenter) => dispatch({
    type: 'NEW_CENTER',
    center: newCenter,
  }),
  updateZoom: (newZoom) => dispatch({
    type: 'UPDATE_ZOOM',
    num: newZoom
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
