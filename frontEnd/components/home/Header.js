import React from 'react';
import {Route, Link} from 'react-router-dom';
import Quote from '.../containers/Quote';
import NewPost from '.../containers/NewPost';

// TODO Header content
// TODO Quote container
// TODO Google drive link
// TODO Discover Button link to toggle Filter (lives in state) --> HOME own container

class Header extends React.Component {

  render() {
    return (
      <div>
        <Quote />
        <NewPost />
      </div>
    );
  }
}

export default Header;
