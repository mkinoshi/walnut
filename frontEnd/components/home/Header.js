import React from 'react';
import Quote from '../../containers/Quote';
import NewPost from '../../containers/NewPost';
import FilterPref from '../../containers/FilterPref';

// TODO Header content
// TODO Google drive link
// TODO render Filter
// TODO render NewPost

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false
    };
  }

  toggleFilter() {
    this.setState({showFilter: !this.state.showFilter});
  }

  render() {
    return (
      <div>
        <p>this is the header</p>
        <Quote />
      </div>
    );
  }
}

export default Header;
