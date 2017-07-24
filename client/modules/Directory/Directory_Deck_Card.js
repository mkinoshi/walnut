/**
 * Created by ebadgio on 7/20/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
  Card: {
    height: '100px',
    width: '300px',
    color: '#fff'
  },
  Name: {
    'fontSize': '150%',
    'fontWeight': 'bold'
  },
  College: {
    'fontSize': '100%',
  },
  Image: {
    borderRadius: '50%',
    float: 'left',
    height: '40px'
  },
  Content: {
    float: 'left'
  },
  Hr: {
    width: '80%'
  },
  Clicked: {
    backgroundColor: 'green'
  },
  Unclicked: {
    backgroundColor: 'blue'
  }
};


class Card extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleClick() {
    this.props.updateClicked(this.props.index);
  }

  render() {
    return (
      <div style={styles[(this.props.clicked === this.props.index) ? 'Clicked' : 'Unclicked']}
      onClick={this.handleClick.bind(this)}>
        <span> <img src={this.props.profile.pictureURL} />
        {this.props.profile.fullName}
        </span>
      </div>
    );
  }
}

/* <div style={styles.Card}>
    <img style={styles.Image}
         src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg"
         alt="5" />
    <div style={styles.Content}>
        <p style={styles.Name}>{this.props.prof.fullName}</p>
        <p style={styles.College}>{this.props.prof.education}</p>
    </div>
    <hr style={styles.Hr}></hr>
</div> */


Card.propTypes = {
  profile: PropTypes.object,
  index: PropTypes.number,
  handleClick: PropTypes.func,
  updateClicked: PropTypes.func,
  clicked: PropTypes.number
};

const mapStateToProps = (state) => ({
  clicked: state.mapReducer.clicked
});

const mapDispatchToProps = (dispatch) => ({
  updateClicked: (index) => dispatch({
    type: 'UPDATE_CLICKED',
    clicked: index
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);

