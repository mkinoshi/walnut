import React from 'react';
// import Iframe from 'react-iframe';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// TODO header

const styles = {
  map: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    top: '30%',
    left: '25%',
  }
};

class Map extends React.Component {

  render() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoib21lc2hvbWVzIiwiYSI6ImNqNTh2cXoxZjAxa2QzM3FxaWgxaDEzbzcifQ.rBTIS3ct7ZxUTR1HGW-cXg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });
    return (
      // <div style={styles.map}>
      //   <Iframe
      //     width="400"
      //     height="400"
      //     frameBorder="0"
      //     url="https://www.google.com/maps/embed/v1/place?key=AIzaSyCRsfBv1y4taRhb2nGyRue4a5rEi3KAtiQ
      //       &q=Space+Needle,Seattle+WA" allowFullScreen />
      // </div>
      <div id="map" style={{height: '100%'}}>
      </div>


    );
  }
}

export default Map;
