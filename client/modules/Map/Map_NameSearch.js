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
    };
  }
  componentDidMount() {
    // this.props.getUserData();
  }
  handleChange(value) {
    console.log(value);
    console.log(this);
    this.setState({selectValue: value.fullName});
    console.log('this.state.selectValue', this.state.selectValue);
  }
  handleNew(event) {
    event.preventDefault();
    // this.props.updateUser({preferences: this.props.preferences.concat(this.state.value)});
    // console.log('value')
    // const index = this.state.users.indexOf(this.state.value);
    // console.log(index);
    console.log(this.state.selectValue);
    const center = this.props.users.find((user) => {return user.fullName === this.state.selectValue;}).location[this.props.selected];
    console.log(center);
    this.props.updateCenter(center);
    this.props.updateZoom(10);
    this.setState({selectValue: ''});
  }
  render() {
    console.log('here', this.state.selectValue);
    console.log(this.props.users);
    return (
      <div>
      <form onSubmit={(e) => this.handleNew(e)}>
         <Select
          name="selected-state"
          value={this.state.selectValue}
          simpleValue
          autofocus
          clearable
          options={this.props.users.filter((item) => (item.location[this.props.selected].length > 0)).map((user) => {
            return {value: user, label: user.fullName};
          })}
          onChange={this.handleChange.bind(this)}
          placeholder="test"
          onInputKeyDown={() => {console.log('hey', this.state.selectValue);}}
        />
        {/* <Select
            name="selected-state"
            value={this.state.selectValue}
            simpleValue
            options={this.props.users.filter((item) => (item.location[this.props.selected].length > 0)).map((user) => {
              return {value: user, label: user.fullName};
            })}
            onChange={this.handleChange.bind(this)}
          /> */}
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
  updateZoom: PropTypes.func,
  users: PropTypes.array,
  selected: PropTypes.string
};
const mapStateToProps = (state) => ({
  users: state.mapReducer.users,
  selected: state.mapReducer.selected
});
const mapDispatchToProps = (dispatch) => ({
  updateCenter: (newCenter) => dispatch({
    type: 'NEW_CENTER',
    center: newCenter,
  }),
  updateZoom: (num) => dispatch({
    type: 'UPDATE_ZOOM',
    num: num
  })
});
export default connect(mapStateToProps, mapDispatchToProps)(NameSearch);
