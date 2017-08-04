import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'underscore';
import createCommunityThunk from '../../thunks/community_thunks/createCommunityThunk';
import joinCommunityThunk from '../../thunks/community_thunks/joinCommunityThunk';
import getAllCommunities from '../../thunks/community_thunks/getAllCommunitiesThunk';
import updateUserCommunityThunk from '../../thunks/user_thunks/updateUserCommunityThunk';


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
      image: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      defaultFilters: [],
      filterValue: '',
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.joinCommunity = this.joinCommunity.bind(this);
  }


  componentWillMount() {
    this.props.getAllCommunities();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCreated) {
      nextProps.getAllCommunities();
    }
  }

  toggleCommunity(com) {
    this.props.changeCommunity(com);
  }

  handleStart() {
    this.setState({showInputs: true});
  }

  handleChange(e) {
    this.setState({titleValue: e.target.value});
  }

  handleFilterChange(e) {
    this.setState({filterValue: e.target.value});
  }

  handleSubmit() {
    this.props.createCommunity(this.state.image, this.state.titleValue, this.state.defaultFilters);
  }

  handleClick(e) {
    e.preventDefault();
    const copy = this.state.defaultFilters;
    copy.push(this.state.filterValue);
    this.setState({defaultFilters: copy, filterValue: ''});
  }

  joinCommunity(id) {
    this.props.joinCommunity(id);
  }


  // TODO HORIZONS
  render() {
    const userCommunityTitles = this.props.userCommunities.map((com) => com.title);
    return (
        <div>
           <div>
            <div>
                <h1>I am the Walnut Home</h1>
            </div>
             <div>
               <h2>Your Communities</h2>
               <div style={styles.communities}>
                   {this.props.userCommunities.map((community, idx) => <Link key={idx}
                   onClick={() => this.toggleCommunity(community)} to={'/app/community/' + community.title.split(' ').join('') + '/discover'}><div key={idx}>
                     <img src={community.icon} style={styles.image} />
                     <p>{community.title}</p>
                   </div></Link> )}
               </div>
             </div>
            <div>
                <h2>Search For new Communities</h2>
                <div style={styles.communities}>
                    {this.props.communities.filter((com) => {
                      return !(userCommunityTitles.indexOf(com.title) > -1);
                    }).map((community, idx) => <div key={idx}>
                        <img src={community.icon} style={styles.image} />
                        <p>{community.title}</p>
                        <button onClick={() => this.joinCommunity(community._id)}>+ Join</button>
                    </div> )
                    }
                </div>
            </div>
            <div>
                <button onClick={() => {this.handleStart();}}>Start New Community</button>
            </div>
            {this.state.showInputs ? <div>
                <label> Title:
                <input type="text"
                       value={this.state.titleValue} onChange={(e) => {this.handleChange(e);}} />
                </label>
                <ul>
                    {this.state.defaultFilters.map((filter, idx) => <li key={idx}>#{' '}{filter}</li>)}
                </ul>
                <form>
                    <label> Create default Filters:
                        <input type="text"
                               value={this.state.filterValue} onChange={(e) => {this.handleFilterChange(e);}} />
                    </label>
                    <input type="submit" value="Add" onClick={(e) => {this.handleClick(e);}} />
                </form>
                <button onClick={() => {this.handleSubmit();}}>Create</button>
            </div> : null}
          </div>
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
  getCommunities: PropTypes.func,
  userCommunities: PropTypes.array,
  changeCommunity: PropTypes.func,
  getAllCommunities: PropTypes.func,
  isCreated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  hasProfile: state.userReducer.hasProfile,
  userCommunities: state.userReducer.communities,
  communities: state.getCommunityReducer.communities,
  isCreated: state.userReducer.isCreated
});

const mapDispatchToProps = (dispatch) => ({
  joinCommunity: (id) => dispatch(joinCommunityThunk(id)),
  createCommunity: (image, title, filters) => dispatch(createCommunityThunk(image, title, filters)),
  changeCommunity: (updateObj) => dispatch(updateUserCommunityThunk(updateObj)),
  getAllCommunities: () => dispatch(getAllCommunities())
});

export default connect(mapStateToProps, mapDispatchToProps)(WalnutHomeContainer);
