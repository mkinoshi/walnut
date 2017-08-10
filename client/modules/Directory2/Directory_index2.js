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

class Directory2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    console.log('here are the users', this.props.users);
    return (
        <div className="Page2">
          <div className="lockedDiv">
            <InfiniteScroll
              className="banterScroller"
              pageStart={0}
              hasMore={false}
              threshold={250}
              loader={<div className="loader">Loading ...</div>}
              useWindow={false}
            >
              {this.props.users.map(user =>
                <DirectoryCard
                picture={user.pictureURL}
                name={user.fullName}
                email={user.contact.email[0]}
                school={user.education.schools[0]}
                job={user.work[0]}
                />
              )}
            </InfiniteScroll>
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
