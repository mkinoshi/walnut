import React from 'react';
// import Iframe from 'react-iframe';
// const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import ReactMapboxGl, { Layer, Feature, Marker, Cluster, ZoomControl } from 'react-mapbox-gl';
import MapFilter from './Map_Filter';
import MapItemSelector from './Map_Item_Selector_Container';
import CircleIcon from 'react-icons/lib/fa/circle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

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
  inner: {
    display: 'flex',
    flexDirection: 'column'
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

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-103.59179687498357, 40.66995747013945],
      zoom: [3],
      clicked: [],
      users: [
        {
          name: 'Alex Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 38.7775032],
          year: 'Summer 2017',
          career: 'Rice University'
        },
        {
          name: 'Omid Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 37.7775032],
          year: 'Summer 2017',
          career: 'Rice University'
        },
        {
          name: 'Makoto Badgio',
          profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
          location: [-122.4199537, 36.7775032],
          year: 'Summer 2017',
          career: 'Rice University'
        },
        {
          name: 'Otto Badgio',
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
      // users: [
      //   {
      //     name: 'Eli Badgio',
      //     profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      //     location: [-122.4199537, 38.7775032],
      //     year: 'Summer 2017',
      //     career: 'Rice University',
      //     liveData: true
      //   },
      //   {
      //     name: 'Eli Badgio',
      //     profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      //     location: [-122.4199537, 37.7775032],
      //     year: 'Summer 2017',
      //     career: 'Rice University',
      //     liveData: true
      //   },
      //   {
      //     name: 'Eli Badgio',
      //     profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      //     location: [-122.4199537, 36.7775032],
      //     year: 'Summer 2017',
      //     career: 'Rice University',
      //     liveData: true
      //   },
      //   {
      //     name: 'Eli Badgio',
      //     profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      //     location: [-122.4199537, 37.8775032],
      //     year: 'Summer 2017',
      //     career: 'Rice University',
      //     liveData: true
      //   },
      //   {
      //     name: 'Eli Badgio',
      //     profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      //     location: [-122.4199537, 37.77757],
      //     year: 'Summer 2017',
      //     career: 'Rice University',
      //     liveData: true
      //   }
      // ]};
  }

  componentDidMount() {
    this.props.getAllUsersMap();
  }

  handleClick(index) {
    this.props.updateCenter(this.state.users[index].location);
    this.props.updateZoom(10);
    this.props.updateClicked(index);
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
        <div style={styles.inner}>
          <MapItemSelector />
          <MapFilter users={this.props.users}
          changeCenter={(coordinates) => {this.props.updateCenter(coordinates);}}
          changeZoom={(num) => {this.props.updateZoom();}}/>
        </div>
        <Map
          style="mapbox://styles/mapbox/dark-v9"
          center={this.props.center}
          zoom={this.props.zoom}
          containerStyle={{
            height: '100vh',
            width: '80vw'
          }}>
            <ZoomControl style={styles.zoom}/>
            <Cluster ClusterMarkerFactory={this.clusterMarker}>
              {
                  this.state.users.map((feature, index) => {
                    return (
                      <Marker
                        key={uuidv4()}
                        coordinates={feature.location}
                        style={styles.cluster}
                        onClick={this.handleClick.bind(this, index)}
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

MapContainer.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.array,
  updateCenter: PropTypes.func,
  updateZoom: PropTypes.func,
  updateClicked: PropTypes.func,
  getAllUsersMap: PropTypes.func,
  users: PropTypes.array
};

const mapStateToProps = (state) => ({
  users: state.mapReducer.users,
  center: state.mapReducer.center,
  zoom: state.mapReducer.zoom
});

const mapDispatchToProps = (dispatch) => ({
  updateCenter: (newCenter) => dispatch({
    type: 'NEW_CENTER',
    center: newCenter,
  }),
  updateZoom: () => dispatch({
    type: 'UPDATE_ZOOM',
  }),
  updateClicked: (index) => dispatch({
    type: 'UPDATE_CLICKED',
    clicked: index
  }),
  getAllUsersMap: () => dispatch({
    type: 'GET_ALL_USERS_MAP'
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
