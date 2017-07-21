/**
 * Created by ebadgio on 7/20/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import EditProfile from '../editProfile/containers/EditProfile';

class WalnutHomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      showInputs: false,
      titleValue: '',
      image: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg'
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleStart() {
    this.setState({showInputs: true});
  }

  handleChange(e) {
    this.setState({titleValue: e.target.value});
  }

  handleSubmit() {
    console.log('submission', this.state);
    // this.props.createBuffer();

    // TODO get community image and url
    this.props.createCommunity(this.state.image, this.state.titleValue);
  }

// TODO horizons buttton for now
// search bar for communities after some greyed out others not

// TODO this should not handle creating a cummunity unless it hasnt been typed
// already and added

// then we go to creating community
// but we skip this and go to horizons home as if it was created

// just needs to be a link to horizons
  render() {
    return (
        <div>
            {this.props.hasProfile ? <div>
            <div>
                <h1>I am the Walnut Home</h1>
            </div>
            <div>
                <h2>Find Communities here:</h2>
            </div>
            <div>
                <button onClick={() => {this.handleStart();}}>Start New Community</button>
            </div>
            {this.state.showInputs ? <div>
                <label> Tile:
                <input type="text"
                       value={this.state.titleValue} onChange={(e) => {this.handleChange(e);}} />
                </label>
                <button onClick={() => {this.handleSubmit();}}><Link to="/app/community">Create</Link></button>
            </div> : null} </div> :
                <EditProfile /> }
        </div>
    );
  }
}

WalnutHomeContainer.propTypes = {
  createCommunity: PropTypes.func,
  hasProfile: PropTypes.bool
};

const mapStateToProps = (state) => ({
  hasProfile: state.userReducer.hasProfile,
});

const mapDispatchToProps = (dispatch) => ({
  createCommunity: (image, title) => dispatch({type: 'CREATE_COMMUNITY', image: image, title: title}),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalnutHomeContainer);
