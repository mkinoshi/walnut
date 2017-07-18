import React from 'react';
// import Iframe from 'react-iframe';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const styles = {
  mapContainer: {
    height: '100%'
  },
  map: {
    height: '100vh',
    width: '80vw'
  }
};

class Map extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoib21lc2hvbWVzIiwiYSI6ImNqNTh2cXoxZjAxa2QzM3FxaWgxaDEzbzcifQ.rBTIS3ct7ZxUTR1HGW-cXg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });
  }

  render() {
    return (
      // <div style={styles.map}>
      //   <Iframe
      //     width="400"
      //     height="400"
      //     frameBorder="0"
      //     url="https://www.google.com/maps/embed/v1/place?key=AIzaSyCRsfBv1y4taRhb2nGyRue4a5rEi3KAtiQ
      //       &q=Space+Needle,Seattle+WA" allowFullScreen />
      // </div>
      <div className="mapContainer" style={styles.mapContainer}>
        <div id="map" style={styles.map}></div>
      </div>
    );
  }
}

export default Map;
