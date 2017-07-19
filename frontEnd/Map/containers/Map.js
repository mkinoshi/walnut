import React from 'react';
// import Iframe from 'react-iframe';
// const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import ReactMapboxGl, { Layer, Feature, Marker, Cluster } from 'react-mapbox-gl';
import MapFilter from '../components/MapFilter';
import CircleIcon from 'react-icons/lib/fa/circle';

const styles = {
  mapContainer: {
    height: '100%'
  },
  map: {
    height: '100vh',
    width: '80vw'
  },
  outer: {
    display: 'flex',
    flexDirection: 'row'
  },
  marker: {
    color: '#37d67a',
    fontSize: '40px'
  },
  cluster: {
    color: '#ff6f00'
  }
};

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoib21lc2hvbWVzIiwiYSI6ImNqNTh2cXoxZjAxa2QzM3FxaWgxaDEzbzcifQ.rBTIS3ct7ZxUTR1HGW-cXg'
});

class MapComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          career: 'Yale University',
          location: [-122.4199537, 37.7775032]
        },
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          career: 'Yale University',
          location: [-122.4199537, 37.8775032]
        },
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          career: 'Yale University',
          location: [-122.9199537, 37.7775032]
        },
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          career: 'Yale University',
          location: [-122.4199537, 38.7775032]
        },
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          career: 'Yale University',
          location: [-123.4199537, 37.7775032]
        }
      ]};
  }

  componentDidMount() {
    // Dispatch fucntion to get all of data
    // TODO we have to get data from the server side through reducers
  }

  clusterMarker(coordinates) {
    console.log(coordinates);
    return (
      <Marker coordinates={coordinates} style={styles.marker}>
        <CircleIcon />
      </Marker>
    );
  }

  render() {
    return (
      <div style={styles.outer}>
        <MapFilter users={this.state.users} />
        <Map
          style="mapbox://styles/mapbox/dark-v9"
          center={[-122.4199537, 37.7775032]}
          zoom={[5]}
          containerStyle={{
            height: '100vh',
            width: '80vw'
          }}>
            {/* <Layer
              type="symbol"
              id="marker"
              layout={{ 'icon-image': 'marker-15' }}
              paint={{'circle-color': {
                property: 'point_count',
                type: 'interval',
                stops: [
                    [0, '#51bbd6'],
                    [100, '#f1f075'],
                    [750, '#f28cb1'],
                ]
              },
            'circle-radius': {
              property: 'point_count',
              type: 'interval',
              stops: [
                    [0, 20],
                    [100, 30],
                    [750, 40]
              ]
            }}}>
              <Feature coordinates={[-122.4199537, 37.7775032]}/>
            </Layer> */}
            <Cluster ClusterMarkerFactory={this.clusterMarker}>
              {
                  this.state.users.map((feature, key) => {
                    console.log(feature);
                    return (
                      <Marker
                        key={key}
                        coordinates={feature.location}
                        style={styles.cluster}>
                        <CircleIcon />
                      </Marker>
                    );
                  }
                )
              }
            </Cluster>
        </Map>
      </div>
    );
  }
}

export default MapComponent;
