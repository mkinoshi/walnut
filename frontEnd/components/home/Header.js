import React from 'react';
import Quote from '../../containers/home/Quote';
import NewPost from '../../containers/home/NewPost';

// TODO Header content
// TODO Google drive link
// TODO render NewPost

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
