import React from 'react';
// import Iframe from 'react-iframe';
// const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import ReactMapboxGl, { Layer, Feature, Marker, Cluster, ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MapFilter from '../components/MapFilter';
import CircleIcon from 'react-icons/lib/fa/circle';
const styles = {
  mapContainer: {
    height: '100%'
  },
  map: {
    height: '92vh',
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
  },
  zoom: {
    marginTop: '5%',
    marginRigth: '1%'
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
          location: [-122.4199537, 38.7775032],
          year: 'Summer 2017',
          career: 'Rice University'
        },
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 37.7775032],
          year: 'Summer 2017',
          career: 'Rice University'
        },
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 36.7775032],
          year: 'Summer 2017',
          career: 'Rice University'
        },
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 37.8775032],
          year: 'Summer 2017',
          career: 'Rice University'
        },
        {
          name: 'Eli Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 37.77757],
          year: 'Summer 2017',
          career: 'Rice University'
        }
      ]};
  }
  componentDidMount() {
    // Dispatch fucntion to get all of data
    // TODO we have to get data from the server side through reducers
  }
  changeCenter(coordinates) {
    // coordinates given in array format
    this.setState({center: coordinates});
  }
  changeZoom(zoom) {
    // zoom given as integer
    this.setState({zoom: [zoom]});
  }
  clusterMarker(coordinates) {
    return (
      <Marker coordinates={coordinates} style={styles.marker}>
        <CircleIcon />
      </Marker>
    );
  }
  render() {
    return (
      <div style={styles.outer}>
        <MapFilter users={this.state.users}
        changeCenter={(coordinates) => {this.changeCenter(coordinates);}}
        changeZoom={(num) => {this.changeZoom(num);}}/>
        <Map
          style="mapbox://styles/mapbox/dark-v9"
          center={this.state.center}
          zoom={this.state.zoom}
          containerStyle={{
            height: '100vh',
            width: '80vw'
          }}>
            <ZoomControl style={styles.zoom}/>
            <Cluster ClusterMarkerFactory={this.clusterMarker}>
              {
                  this.state.users.map((feature, key) => {
                    return (
                      <Marker
                        key={key}
                        coordinates={feature.location}
                        style={styles.cluster}
                        onClick={() => {
                          this.changeCenter([20, 20]);
                          this.changeZoom(10);
                        }}
                        >
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
