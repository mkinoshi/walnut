/**
 * Created by ebadgio on 8/3/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from './Directory2.css';
import getUsersThunk from '../../thunks/directory_thunks/getUsersThunk';
import DirectoryCard from './Directory_Card';
import InfiniteScroll from 'react-infinite-scroller';
import Select from 'react-select';
import uuidv4 from 'uuid/v4';

class Directory2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCards: [],
      query: ''
    };
  }

  componentWillMount() {
    this.props.getUsers();
  }

  componentDidMount() {
    const urls = this.props.location.pathname;
    localStorage.setItem('url', urls);
    sessionStorage.setItem('url', urls);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    this.setState({currentCards: nextProps.users});
  }

  handleChange(value) {
    console.log('it works!', value);
    const substring = (value ? value : '').toLowerCase();
    const filteredCards = this.props.users.filter((user) => {return user.fullName.toLowerCase().includes(substring);});
    this.setState({currentCards: filteredCards});
  }

  render() {
    console.log('here are the users', this.props.users, this.state.currentCards);
    return (
      <div>
        <Select
          className="search"
          name="selected-state"
          value={this.state.query}
          simpleValue
          autofocus
          clearable
          options={this.props.users.map((user) => {
            return {value: user.fullName, label: user.fullName};
          })}
          placeholder="Search by Name..."
          onInputChange={this.handleChange.bind(this)}
        /> <br/>
        <div className="directoryCardsList">
              {this.props.users.map(user =>
              <DirectoryCard
                key={uuidv4()}
                picture={user.pictureURL}
                name={user.fullName}
                email={user.contact.email[0]}
                school={user.education.colleges[0]}
                job={user.work[0]}
              />
              )}
        </div>
      </div>
    );
  }
}


Directory2.propTypes = {
  getUsers: PropTypes.func,
  users: PropTypes.array,
  location: PropTypes.object
};

const mapStateToProps = (state) => ({
  users: state.directoryReducer.users
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsersThunk)
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory2);
