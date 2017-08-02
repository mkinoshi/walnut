// maps through posts and renders Post
// connect
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from '../Post/Post_index';
import FilterPrefContainer from './Feed_FilterPref_Container';
import InfiniteScroll from 'react-infinite-scroller';
import discoverLoadThunk from '../../thunks/discover_thunks/discoverLoadThunk';
import newLikeThunk from '../../thunks/post_thunks/newLikeThunk';
import nextTenThunk from '../../thunks/discover_thunks/nextTenThunk';

const styles = {
  outer: {
    borderWidth: '1px',
    width: '24.5%',
    height: '117px',
    borderRadius: '25px',
    marginTop: '-15%',
    borderTop: 'solid',
    borderRight: 'solid',
    marginRight: '10%'
  },
  outer2: {
    borderWidth: '1px',
    width: '24.5%',
    height: '117px',
    borderRadius: '25px',
    marginTop: '-15%',
    marginLeft: '76.3%',
    borderTop: 'solid',
    borderLeft: 'solid'
  },
  inner1: {
    borderWidth: '1px',
    width: '5%',
    height: '20px',
    borderTop: 'solid',
    backgroundColor: 'white',
    position: 'relative',
    marginTop: '-9.1%'
  },
  inner2: {
    borderWidth: '1px',
    width: '24.5%',
    height: '40px',
    borderRight: 'solid',
    marginTop: '-4%',
    backgroundColor: 'white',
    position: 'relative'
  },
  inner3: {
    width: '24.5%'
  },
  under: {
    height: '30%',
    borderTop: 'solid',
    width: '51.4%',
    marginLeft: '24.3%',
    marginTop: '-7%'
  },
  innerRight1: {
    borderWidth: '1px',
    width: '10%',
    height: '20px',
    borderTop: 'solid',
    marginTop: '-117px',
    backgroundColor: 'white',
    position: 'relative'
  },
  innerRight2: {
    borderWidth: '1px',
    width: '24.5%',
    height: '30px',
    borderLeft: 'solid',
    marginTop: '18.8%',
    backgroundColor: 'white',
    marginLeft: '75.5%',
    position: 'relative'
  },
  feed: {
    marginTop: '2%'
  }
};

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilterPref: false,
      filters: [],
      count: 0
    };
  }
  componentWillMount() {
  }

  handleScroll(e) {
    // if (window.innerHeight - window.scrollY < 500 && window.innerHeight - window.scrollY > 450) {
    //   this.props.getNext10(this.props.data.posts.length);
    // }
  }

  toggleFilterPref() {
    this.setState({showFilterPref: !this.state.showFilterPref});
  }

  filterChange(filterName) {
    const filts = this.state.filters;
    if (filts.indexOf(filterName) >= 0) {
      const idx = filts.indexOf(filterName);
      filts.splice(idx, 1);
    } else {
      filts.push(filterName);
    }
    this.setState({filters: filts});
  }

  filterData(filters, posts) {
    // if the array zero return the entire unfiltered array
    if(filters.length === 0 || filters.length === this.props.data.defaultFilters.length) {
      return {filters: filters, posts: posts};
    }
    const final = posts.filter((post) => {
      const findOne = (haystack, arr) => {
        return arr.some(tag => haystack.indexOf(tag.name) >= 0);
      };
      return findOne(filters, post.tags) === true;
    });

    return {filters: filters, posts: final};
  }

  _loadMore() {
    this.props.getNext10(this.props.data.posts.length);
  }

  render() {
    const filteredPosts = this.filterData(this.state.filters, this.props.data.posts).posts;
    return (
      <div>
          <div className="col-xs-12" onScroll={() =>{console.log('scrolling');}} style={styles.feed}>
            <div className="col-xs-3">
              <div className="discoverButton left" style={{}}>
                <a style={{backgroundColor: '#FF5657', marginTop: '-15px', marginLeft: '30%'}}
                  className="waves-effect waves-light btn"
                  onClick={() => (this.toggleFilterPref())}>Discover</a>
              </div>
            {this.state.showFilterPref ? <FilterPrefContainer filterChange={(name) => (this.filterChange(name))}/> : <p></p>}
            </div>
            <div className="col-xs-9" >
              {(this.props.data.isFetching !== true) ?
                <InfiniteScroll
                  pageStart={0}
                  loadMore={() => this._loadMore()}
                  hasMore={this.props.hasMore}
                  threshold={600}
                  loader={<div className="loader">Loading ...</div>}
                  >
                  {filteredPosts.map((post) => (
                  <Post ref="card"
                  key={post.postId}
                  isOpen={false}
                  currentUser={this.props.user}
                  postData={post}
                  newLike={() => (this.props.newLike(post.postId))}/>
                  ))}
                  </InfiniteScroll>
                  :
                  <p>loading is true inside the reducer</p>
              }
            </div>
          </div>
      </div>
    );
  }
}

Feed.propTypes = {
  data: PropTypes.object,
  newLike: PropTypes.func,
  getData: PropTypes.func,
  getNext10: PropTypes.func,
  hasMore: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  data: state.discoverReducer,
  hasMore: state.discoverReducer.hasMore,
  user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
  newLike: (id) => newLikeThunk(id)(dispatch),
  getData: () => dispatch(discoverLoadThunk()),
  getNext10: (param) => nextTenThunk(param)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
