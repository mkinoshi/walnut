import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from './Directory.css';
import DeckContainer from './Directory_Deck_Container';
import Profile from './Directory_Profile/Directory_Profile_Index';
import getAllUsersThunk from '../../thunks/user_thunks/getAllUsersThunk';


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
