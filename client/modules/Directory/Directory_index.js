import React from 'react';
import './Directory.css';
import DeckContainer from './Directory_Deck_Container';
import Profile from './Directory_Profile/Directory_Profile_Index';


class Directory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="Page">
          <DeckContainer />
          <Profile />
        </div>
    );
  }
}

export default Directory;
