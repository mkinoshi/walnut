import React from 'react';
import PropTypes from 'prop-types';
import Story from './Story';
import Portfolio from './Portfolio';


class Main extends React.Component {

  render() {
    return (
      <div>
        <p>Main</p>
        <Story data={this.props.data.story}/>
        <Portfolio data={this.props.data.portfolio}/>
      </div>
    );
  }
}

Main.propTypes = {
  data: PropTypes.object
};

export default Main;
