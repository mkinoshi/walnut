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
      value: 'lonely',
    };
  }
  componentDidMount() {
    // this.props.getUserData();
  }
  handleChange(value) {
    if (value) {
      const u = this.props.users.find((user) => {return user.fullName === value;});
      const center = u.location[this.props.selected];
      this.props.updateClicked(u.id);
      this.props.updateCenter(center);
      this.props.updateZoom(10);
      this.setState({value: value});
    } else {
      this.setState({value: ''});
    }
  }
  handleNew(event) {
    event.preventDefault();
    const center = this.props.users.find((user) => {return user.fullName === this.state.value;}).location[this.props.selected];
    this.props.updateCenter(center);
    this.props.updateZoom(10);
    this.setState({value: ''});
  }
  render() {
    return (
         <Select
          style={styles}
          name="selected-state"
          value={this.state.value}
          simpleValue
          autofocus
          clearable
          options={this.props.users.filter((item) => (item.location[this.props.selected].length > 0)).map((user) => {
            return {value: user.fullName, label: user.fullName};
          })}
          onChange={this.handleChange.bind(this)}
          placeholder="Search by Name"
        />
    );
  }
}

NameSearch.propTypes = {
  updateCenter: PropTypes.func,
  updateZoom: PropTypes.func,
  users: PropTypes.array,
  selected: PropTypes.string,
  updateClicked: PropTypes.func
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
  }),
  updateClicked: (id) => dispatch({
    type: 'UPDATE_CLICKED',
    clicked: id
  }),
});
export default connect(mapStateToProps, mapDispatchToProps)(NameSearch);
