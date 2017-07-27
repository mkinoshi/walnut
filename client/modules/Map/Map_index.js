import React from 'react';
// import Iframe from 'react-iframe';
// const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import ReactMapboxGl, { Layer, Feature, Marker, Cluster, ZoomControl } from '../../../myNpmModules/react-mapbox-gl';
import MapFilter from './Map_Filter';
import MapItemSelector from './Map_Item_Selector_Container';
import CircleIcon from 'react-icons/lib/fa/circle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import getAllUsersMapThunk from '../../thunks/map_thunks/getAllUsersMapThunk';

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
  accessToken: 'pk.eyJ1Ijoib21lc2hvbWVzIiwiYSI6ImNqNTh2cXoxZjAxa2QzM3FxaWgxaDEzbzcifQ.rBTIS3ct7ZxUTR1HGW-cXg',
  attributionControl: false,
  logoPosition: 'bottom-right'
});

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  handleClick(id) {
    const index = this.props.users.findIndex((person) => {return person.id === id;});
    this.props.updateCenter(this.props.users[index].location[this.props.selected]);
    // WEIRD: this line was causing an error for some reason: (figured it out now)
    // this.props.updateZoom(10);
    this.props.updateClicked(id);
  }

  handleClusterClick() {
    console.log('ohohohohohohohohohohohoh');
  }

  clusterMarker(coordinates) {
    console.log(coordinates);
    return (
      <Marker onMouseEnter={() => {console.log('yoyoyoyoyoyoyoyo');}} coordinates={coordinates} style={styles.marker}>
        <CircleIcon />
      </Marker>
    );
  }
  render() {
    console.log('re-rendering map', this.props.center);
    console.log(Cluster);
    const users = this.props.users.filter((user) => {
      return user.location[this.props.selected].length > 0;
    });
    return (
      <div style={styles.outer}>
        <div style={styles.inner}>
          <MapItemSelector />
          <MapFilter users={this.props.users}
          changeCenter={(coordinates) => {this.props.updateCenter(coordinates);}}
          changeZoom={(num) => {this.props.updateZoom(num);}} />
        </div>
        <Map
          style="mapbox://styles/mapbox/streets-v10"
          center={this.props.center}
          zoom={this.props.zoom}
          attributionControl={false}
          containerStyle={{
            height: '100vh',
            width: '80vw'
          }}>
            <ZoomControl style={styles.zoom}/>
            <Cluster ClusterMarkerFactory={this.clusterMarker} maxZoom={12}>
              {
                  users.map((feature) => {
                    return (
                      <Marker
                        key={uuidv4()}
                        user={feature}
                        coordinates={feature.location[this.props.selected]}
                        style={styles.cluster}
                        onClick={this.handleClick.bind(this, feature.id)}
                        >
                        <img src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" style={{width: '60px', height: '60px', borderRadius: '30px'}} />
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
  getAllUsers: PropTypes.func,
  users: PropTypes.array,
  selected: PropTypes.string,
};

const mapStateToProps = (state) => ({
  users: state.mapReducer.users,
  center: state.mapReducer.center,
  zoom: state.mapReducer.zoom,
  selected: state.mapReducer.selected
});

const mapDispatchToProps = (dispatch) => ({
  updateCenter: (newCenter) => dispatch({
    type: 'NEW_CENTER',
    center: newCenter,
  }),
  updateZoom: (newZoom) => dispatch({
    type: 'UPDATE_ZOOM',
    num: newZoom
  }),
  updateClicked: (id) => dispatch({
    type: 'UPDATE_CLICKED',
    clicked: id
  }),
  getAllUsers: () => getAllUsersMapThunk(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
