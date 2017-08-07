/**
 * Created by ebadgio on 8/3/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from './Directory2.css';
import getAllUsersThunk from '../../thunks/user_thunks/getAllUsersThunk';
import DirectoryCard from './Directory_Card';

class Directory2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="Page2">
            <DirectoryCard />
            <DirectoryCard />
            <DirectoryCard />
            <DirectoryCard />
            <DirectoryCard />
            <DirectoryCard />
            <DirectoryCard />
            <DirectoryCard />
        </div>
    );
  }
}


export default Directory2;
