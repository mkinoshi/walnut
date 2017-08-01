/**
 * Created by ebadgio on 7/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import css from '.././Directory.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Image } from 'semantic-ui-react';



class Links extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="Links">
            <h1> Links </h1>
        </div>
    );
  }
}

Links.propTypes = {
  user: PropTypes.object
};

export default Links;
