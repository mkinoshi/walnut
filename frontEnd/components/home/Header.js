import React from 'react';
import Quote from '../../containers/Quote';
import NewPost from '../../containers/NewPost';
import FilterPref from '../../containers/FilterPref';

// TODO Header content
// TODO Google drive link
// TODO render Filter
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
