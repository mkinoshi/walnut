import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './App.css';
import createCommunityThunk from '../../thunks/community_thunks/createCommunityThunk';
import joinCommunityThunk from '../../thunks/community_thunks/joinCommunityThunk';
import getAllCommunities from '../../thunks/community_thunks/getAllCommunitiesThunk';
import updateUserCommunityThunk from '../../thunks/user_thunks/updateUserCommunityThunk';
import CommunityCard from './App_CommunityCard';
import NewCommunityModal from './App_NewCommunityModal';


class WalnutHomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      titleValue: '',
      image: 'https://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
      defaultFilters: [],
      filterValue: '',
      isCalled: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.joinCommunity = this.joinCommunity.bind(this);
  }


  componentWillMount() {
    this.props.getAllCommunities();
  }

  componentDidMount() {
    localStorage.setItem('url', '/walnuthome');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCreated && !this.state.isCalled) {
      nextProps.getAllCommunities();
      this.setState({ isCalled: true });
    }
  }


  toggleCommunity(com) {
    this.props.changeCommunity(com);
  }

  handleSubmit(image, titleValue, defaultFilters) {
    this.props.createCommunity(image, titleValue, defaultFilters);
  }


  joinCommunity(id) {
    this.props.joinCommunity(id);
  }


  // TODO HORIZONS
  render() {
    const userCommunityTitles = this.props.userCommunities.map((com) => com.title);
    return (
        <div className="walnutContainer">
            <div className="Heading">
                <h1>Walnut</h1>
                <hr />
            </div>
                <div>
                  <NewCommunityModal handleCreate={this.handleSubmit} />
                </div>
               <h2 className="subHead">Your Communities</h2>
               <div className="communitiesContainer">
                   {/* {this.props.userCommunities.map((community, idx) => <Link key={idx}*/}
                   {/* onClick={() => this.toggleCommunity(community)} to={'/community/' + community.title.split(' ').join('') + '/discover'}><div key={idx}>*/}
                     {/* <img src={community.icon} style={styles.image} />*/}
                     {/* <p>{community.title}</p>*/}
                   {/* </div></Link> )}*/}
                   {this.props.userCommunities.map((community, idx) =>
                       <Link key={idx}
                             onClick={() => this.toggleCommunity(community)}
                             to={'/community/' + community.title.split(' ').join('') + '/discover'}>
                     <CommunityCard joined
                                    icon={community.icon}
                                    title={community.title}
                                    key={idx} /></Link>)}
               </div>
                <h2 className="subHead">Search For new Communities</h2>
                <div className="communitiesContainer">
                    {/* {this.props.communities.filter((com) => {*/}
                      {/* return !(userCommunityTitles.indexOf(com.title) > -1);*/}
                    {/* }).map((community, idx) => <div key={idx}>*/}
                        {/* <img src={community.icon} style={styles.image} />*/}
                        {/* <p>{community.title}</p>*/}
                        {/* <button onClick={() => this.joinCommunity(community._id)}>+ Join</button>*/}
                    {/* </div> )*/}
                    {/* }*/}
                    {this.props.communities.filter((com) => {
                      return !(userCommunityTitles.indexOf(com.title) > -1);
                    }).map((community, idx) => <CommunityCard icon={community.icon}
                                                              title={community.title}
                                                              communityId={community._id}
                                                              join={this.joinCommunity}
                                                              key={idx}/>)
                    }
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
