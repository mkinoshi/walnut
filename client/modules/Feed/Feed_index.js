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
import { Loader, Button, Modal, Header } from 'semantic-ui-react';


let refresh;

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilterPref: false,
      filters: [],
      count: 0,
      modalIsOpen: false
    };
  }

  componentWillUnmount() {
    clearInterval(refresh);
  }

  mofoMouseOver() {
    refresh = setInterval(() => { this.props.getRefresh(this.props.lastRefresh); }, 5000);
  }

  mofoMouseOff() {
    clearInterval(refresh);
  }

  toggleFilterPref() {
    this.setState({showFilterPref: !this.state.showFilterPref});
  }

  _loadMore() {
    this.props.getNext10(this.props.data.posts.length, this.props.lastRefresh);
  }

  newConversationModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  }

  render() {
    return (
      <div className="Feed_Wrapper">
        <div className="feedTop">
          <div className="discoverTitleBox">
            <h1 className="discoverTitle">Discover</h1>
            <div id="discoverLine" className="discoverTitleLine"></div>
          </div>
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
            pageStart={0}
            loadMore={() => this._loadMore()}
            hasMore={this.props.hasMore}
            threshold={250}
            loader={<Loader active inline="centered" />}
            useWindow={false}
            >
            {/* <div className="deMofoSaviour" onMouseOver={() => this.mofoMouseOver()} onMouseLeave={() => this.mofoMouseOff()}></div>*/}
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
        open={this.state.modalIsOpen}
        onClose={() => this.newConversationModal()}>
          <Header
          id="conversationHeader"
          content="New conversations" />
          <Modal.Content className="newConversationOuter">
            <NewPostContainer/>
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
  lastRefresh: PropTypes.string
};

const mapStateToProps = (state) => ({
  data: state.discoverReducer,
  hasMore: state.discoverReducer.hasMore,
  user: state.userReducer,
  isReady: state.discoverReducer.isReady,
  lastRefresh: state.discoverReducer.lastRefresh
});

const mapDispatchToProps = (dispatch) => ({
  newLike: (id) => newLikeThunk(id)(dispatch),
  getRefresh: (lastRefresh) => dispatch(discoverRefreshThunk(lastRefresh)),
  getNext10: (param, lastRefresh) => dispatch(nextTenThunk(param, lastRefresh))
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
