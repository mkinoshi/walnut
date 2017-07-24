// searches on the Map by name
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from 'react-select/dist/react-select.css';

// today could not figure out why value won't change for Select!!!!! so weird

class NameSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-103.59179687498357, 40.66995747013945],
      zoom: [3],
      selectValue: 'lonely',
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
      ]
    };
  }
  componentDidMount() {
    // this.props.getUserData();
  }
  handleChange(value) {
    console.log('value', value);
    console.log(this);
    this.setState({selectValue: value.name});
    console.log('this.state.selectValue', this.state.selectValue);
  }
  handleNew(event) {
    event.preventDefault();
    // this.props.updateUser({preferences: this.props.preferences.concat(this.state.value)});
    // console.log('value')
    // const index = this.state.users.indexOf(this.state.value);
    // console.log(index);
    console.log(this.state.selectValue);
    const center = this.state.users.find((user) => {return user.name === this.state.selectValue;}).location;
    console.log(center);
    this.props.updateCenter(center);
    this.props.updateZoom();
    this.setState({selectValue: ''});
  }
  render() {
    console.log('here', this.state.selectValue);
    return (
      <div>
      <form onSubmit={(e) => this.handleNew(e)}>
        <Select
          name="selected-state"
          value={this.state.selectValue}
          simpleValue
          autofocus
          clearable
          options={this.state.users.map((user) => {
            return {value: user, label: user.name};
          })}
          onChange={this.handleChange.bind(this)}
          placeholder="test"
          onInputKeyDown={() => {console.log('hey', this.state.selectValue);}}
        />
        <button type="submit">Search by Name</button>
      </form>
      </div>
    );
  }
}
// FilterPref.propTypes = {
//   preferences: PropTypes.array,
//   toggleChecked: PropTypes.func,
//   getUserData: PropTypes.func,
//   updateUser: PropTypes.func
// };
// const mapStateToProps = (state) => ({
//   filters: state.discoverReducer.filters,
//   preferences: state.userReducer.preferences
// });
// const mapDispatchToProps = (dispatch) => ({
//   toggleChecked: (name, index) => dispatch({type: 'TOGGLE_FILTER_CHECKED', name: name, index: index}),
//   getUserData: () => dispatch({type: 'GET_USER_DATA'}),
//   updateUser: (updateObj) => dispatch({type: 'UPDATE_USER', data: updateObj})
//   // toggleCheckedFront: (name, index) => dispatch({type: 'TOGGLE_FILTER_FRONT', name: name, index: index})
// });
// export default connect(mapStateToProps, mapDispatchToProps)(NameSearch);
NameSearch.propTypes = {
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
  updateZoom: () => dispatch({
    type: 'UPDATE_ZOOM',
  })
});
export default connect(mapStateToProps, mapDispatchToProps)(NameSearch);
