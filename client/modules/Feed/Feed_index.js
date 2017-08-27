// maps through posts and renders Post
// connect
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from '../Post/Post_index';
import InfiniteScroll from 'react-infinite-scroller';
import discoverRefreshThunk from '../../thunks/discover_thunks/discoverRefreshThunk';
import newLikeThunk from '../../thunks/post_thunks/newLikeThunk';
import nextTenThunk from '../../thunks/discover_thunks/nextTenThunk';
import NewPostContainer from './Feed_NewPost_Container.js';
import './Feed.css';
import { Loader, Button, Modal, Icon, Header } from 'semantic-ui-react';


let refresh;
const curScroll = 0;

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilterPref: false,
      filters: [],
      count: 0,
      // modalIsOpen: false
    };
  }

  componentWillUnmount() {
    clearInterval(refresh);
  }

  mofoMouseOver() {
    refresh = setInterval(() => { this.props.getRefresh(this.props.lastRefresh, this.props.useFilters); }, 5000);
  }

  mofoMouseOff() {
    clearInterval(refresh);
  }

  toggleFilterPref() {
    this.setState({showFilterPref: !this.state.showFilterPref});
  }

  _loadMore() {
    if (this.props.lastRefresh) {
      this.props.getNext10(this.props.data.posts.length, this.props.lastRefresh, this.props.useFilters);
    }
  }

  newConversationModal() {
    this.props.toggleModal();
    // this.setState({modalIsOpen: !this.state.modalIsOpen});
  }

  render() {
    return (
      <div className="Feed_Wrapper">
        <div className="feedTop">
          <div>
            <Button
            onClick={() => this.newConversationModal()}
            id="newConversationButton"
            content="New conversation"/>
          </div>
        </div>
        {this.props.data.isFetching || !this.props.isReady ?
            <Loader active inline="centered" /> :
           <div style={{height: '88vh', overflow: 'auto'}}>
            <InfiniteScroll
            className="banterScroller"
              id="banterScroller"
            pageStart={0}
            loadMore={() => this._loadMore()}
            hasMore={this.props.hasMore}
            threshold={250}
            loader={<Loader active inline="centered" />}
            useWindow={false}
            >
             <div className="deMofoSaviour" onMouseOver={() => this.mofoMouseOver()} onMouseLeave={() => this.mofoMouseOff()}></div>
          {this.props.data.posts.map((post) => (
            <Post ref="card"
            key={post.postId}
            isOpen={false}
            currentUser={this.props.user}
            postData={post}
            newLike={() => (this.props.newLike(post.postId))}/>
            ))}
            </InfiniteScroll>
           </div>
        }
        <Modal
        basic
        open={this.props.modalIsOpen}>
          <Modal.Header
          id="conversationHeader"
          >
            <h1 className="newConvHeader">New Conversation</h1>
            <Button onClick={() => this.props.toggleModal()} className="cancelButton">
              <Icon name="cancel"/>
              Cancel
            </Button>
          </Modal.Header>
          <Modal.Content className="newConversationOuter">
            <NewPostContainer />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

Feed.propTypes = {
  data: PropTypes.object,
  newLike: PropTypes.func,
  getRefresh: PropTypes.func,
  getNext10: PropTypes.func,
  hasMore: PropTypes.bool,
  user: PropTypes.object,
  isReady: PropTypes.bool,
  lastRefresh: PropTypes.string,
  useFilters: PropTypes.array,
  modalIsOpen: PropTypes.bool,
  toggleModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  data: state.discoverReducer,
  hasMore: state.discoverReducer.hasMore,
  user: state.userReducer,
  isReady: state.discoverReducer.isReady,
  lastRefresh: state.discoverReducer.lastRefresh,
  useFilters: state.discoverReducer.useFilters,
  modalIsOpen: state.discoverReducer.modalIsOpen
});

const mapDispatchToProps = (dispatch) => ({
  newLike: (id) => newLikeThunk(id)(dispatch),
  getRefresh: (lastRefresh, filters) => dispatch(discoverRefreshThunk(lastRefresh, filters)),
  getNext10: (param, lastRefresh, filters) => dispatch(nextTenThunk(param, lastRefresh, filters)),
  toggleModal: () => dispatch({type: 'MODAL_TOGGLE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
