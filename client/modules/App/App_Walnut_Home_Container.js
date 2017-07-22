import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import EditProfile from '../EditProfile/EditProfile_index';

const styles = {
  communities: {
    display: '-webkit-inline-box'
  },
  image: {
    maxHeight: '50px',
    maxWidth: '50px',
    margin: '7px 15px 7px 30px'
  }
};

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
    this.joinCommunity = this.joinCommunity.bind(this);
  }

  componentWillMount() {
    this.props.getCommunities();
    console.log('trying to get communities');
  }

  componentDidMount() {
    this.props.getUser();
    console.log('mounted', this.props.hasProfile);
  }

  handleStart() {
    this.setState({showInputs: true});
  }

  handleChange(e) {
    this.setState({titleValue: e.target.value});
  }

  handleSubmit() {
    console.log('submission', this.state);
    this.props.createCommunity(this.state.image, this.state.titleValue);
  }

  joinCommunity(id) {
    this.props.joinCommunity(id);
  }

  // TODO HORIZONS
  render() {
    return (
        <div>
            {this.props.hasProfile ? <div>
            <div>
                <h1>I am the Walnut Home</h1>
            </div>
            <div>
                <h2>Find Communities here:</h2>
                <div style={styles.communities}>
                    {this.props.communities.map((community, idx) => <div key={idx}>
                      <img src={community.icon} style={styles.image} />
                      <p>{community.title}</p>
                      <button onClick={() => {this.joinCommunity(community._id);}}><Link to="/app/community/discover">+ Join</Link></button>
                    </div> )}
                </div>
            </div>
            <div>
                <button onClick={() => {this.handleStart();}}>Start New Community</button>
            </div>
            {this.state.showInputs ? <div>
                <label> Tile:
                <input type="text"
                       value={this.state.titleValue} onChange={(e) => {this.handleChange(e);}} />
                </label>
                <button onClick={() => {this.handleSubmit();}}><Link to="/app/community/discover">Create</Link></button>
            </div> : null} </div> :
                <EditProfile isCreating={!null} /> }
        </div>
    );
  }
}

WalnutHomeContainer.propTypes = {
  createCommunity: PropTypes.func,
  hasProfile: PropTypes.bool,
  getUser: PropTypes.func,
  communities: PropTypes.array,
  joinCommunity: PropTypes.func,
  getCommunities: PropTypes.func
};

const mapStateToProps = (state) => ({
  hasProfile: state.userReducer.hasProfile,
  communities: state.getCommunityReducer.communities
});

const mapDispatchToProps = (dispatch) => ({
  joinCommunity: (id) => dispatch({type: 'JOIN_COMMUNITY', id: id}),
  createCommunity: (image, title) => dispatch({type: 'CREATE_COMMUNITY', image: image, title: title}),
  getUser: () => dispatch({type: 'GET_USER_DATA'}),
  getCommunities: () => dispatch({type: 'GET_ALL_COMMUNITIES'})
});

export default connect(mapStateToProps, mapDispatchToProps)(WalnutHomeContainer);
