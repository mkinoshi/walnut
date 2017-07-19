import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Popup, Cluster } from 'react-mapbox-gl';
import CircleIcon from 'react-icons/lib/fa/circle';
// import Iframe from 'react-iframe';

const styles = {
  mapContainer: {
    height: '100%'
  },
  map: {
    height: '100vh',
    width: '80vw'
  },
  image: {
    height: '50',
    width: '50'
  },
  marker: {
    color: 'red',
    fontSize: '30px'
  },
  clusterMarker: {
    color: 'blue',
    fontSize: '30px'
  }
};

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoib21lc2hvbWVzIiwiYSI6ImNqNTh2cXoxZjAxa2QzM3FxaWgxaDEzbzcifQ.rBTIS3ct7ZxUTR1HGW-cXg'
});


class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-103.59179687498357, 40.66995747013945],
      zoom: [3],
      clicked: [],
      users: [
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 38.7775032]
        },
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 37.7775032]
        },
        {
          name: 'Eli Badgio',
          peofileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 36.7775032]
        },
        {
          name: 'Eli Badgio',
          peofileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 37.8775032]
        },
        {
          name: 'Eli Badgio',
          peofileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 37.77757]
        }
      ]};
  }

  changeCenter(coordinates) {
    // coordinates given in array format
    this.setState({center: coordinates});
  }

  changeZoom(zoom) {
    // zoom given as integer
    this.setState({zoom: [zoom]});
  }

  render() {
    const clusterMarker = (coordinates) => {
      return (
        <Marker
        coordinates={coordinates}
        style={styles.clusterMarker}
        >
          <CircleIcon />
        </Marker>
        );
    };
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        center={this.state.center}
        zoom={this.state.zoom}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
          <Cluster ClusterMarkerFactory={clusterMarker}
          >
            {
              this.state.users.map((user, key) =>
                <Marker
                  key={key}
                  style={styles.marker}
                  coordinates={user.location}
                  onClick={() => {
                    this.changeCenter([20, 20]);
                    this.changeZoom(10);
                  }}
                  // onClick={this.onMarkerClick.bind(this, feature.geometry.coordinates)}
                  >
                  <CircleIcon />
                </Marker>
              )
            }
          </Cluster>
      </Map>
    );
  }
}

export default MapComponent;
