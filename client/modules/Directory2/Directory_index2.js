/**
 * Created by ebadgio on 8/3/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from './Directory2.css';
import getUsersThunk from '../../thunks/directory_thunks/getUsersThunk';
import DirectoryCard from './Directory_Card';

class Directory2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const urls = this.props.location.pathname;
    console.log(urls);
    localStorage.setItem('url', urls);
    
  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    console.log('here are the users', this.props.users);
    return (
        <div className="Page2">
            {this.props.users.map(user =>
              <DirectoryCard
              picture={user.pictureURL}
              name={user.fullName}
              email={user.contact.email[0]}
              school={user.education.schools[0]}
              job={user.work[0]}
              />
            )}
        </div>
    );
  }
}


Directory2.propTypes = {
  getUsers: PropTypes.func,
  users: PropTypes.array,
};

const mapStateToProps = (state) => ({
  users: state.directoryReducer.users
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsersThunk)
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory2);
