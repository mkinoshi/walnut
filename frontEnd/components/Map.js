import React from 'react';
import Iframe from 'react-iframe';

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
    return (
      <div style={styles.map}>
        <Iframe
          width="400"
          height="400"
          frameBorder="0"
          url="https://www.google.com/maps/embed/v1/place?key=AIzaSyCRsfBv1y4taRhb2nGyRue4a5rEi3KAtiQ
            &q=Space+Needle,Seattle+WA" allowFullScreen />
      </div>
    );
  }
}

export default Map;
