import React from 'react';


const styles = {
  story: {
    backgroundColor: 'lightblue',
    width: '65%',
    paddingLeft: '2%'
  }
};

class StoryContainer extends React.Component {

  render() {
    return (
      <div style={styles.story} className="row col-xs-12">
        <h2>Story</h2>
      </div>
    );
  }
}

export default StoryContainer;
