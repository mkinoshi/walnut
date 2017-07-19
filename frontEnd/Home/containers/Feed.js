// maps through posts and renders Post
// connect
import React from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import PropTypes from 'prop-types';
import FilterPref from './FilterPref';


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
    };
  }

  toggleFilterPref() {
    this.setState({showFilterPref: !this.state.showFilterPref});
  }

  filterData(data) {
    const checkedFilterObject = data.filters.filter((filter) => (filter.checked === true));
    const getFields = (input, field) => {
      const output = [];
      for(let i = 0; i < input.length; ++i) {
        output.push(input[i][field]);
      }
      return output;
    };
    // filters array of tags
    const filters = getFields(checkedFilterObject, 'name');
    // if the array zero return the entire unfiltered array
    if(filters.length === 0) {
      return data;
    }
    const final = data.posts.filter((post) => {
      const findOne = (haystack, arr) => {
        return arr.some(tag => haystack.indexOf(tag) >= 0);
      };
      if(findOne(filters, post.tags) === true) {
        return post;
      }
      return null;
    });
    const filteredState = {filters: data.filters, posts: final};
    return filteredState;
  }

  render() {
    console.log('sdfdfdsfdsfdsfdsfdsfdsfsdfsdf', this.props.data);
    const filteredPosts = this.filterData(this.props.data).posts;
    return (
      <div>
        <div className="col-xs-3" style={styles.outer}>
          <div className="discoverButton" style={{}}>
            <a style={{backgroundColor: '#FF5657', marginTop: '-15px', marginLeft: '30%'}}
              className="waves-effect waves-light btn"
              onClick={() => (this.toggleFilterPref())}>Discover</a>
          </div>
          {this.state.showFilterPref ? <FilterPref filterChange={(name) => (this.filterChange(name))}/> : <p></p>}
          </div>
          <div className="col-xs-12" style={styles.under}></div>
          <div className="right" style={styles.outer2} />
          <div className="rightInnerLeft" style={styles.innerRight2}></div>
          <div className="col-xs-12" style={styles.feed}>
            {filteredPosts.map((post) => (
              <Post key={post.postId} postData={post} newLike={() => (this.props.newLike(post.postId))}/>
            ))}
          </div>
          <div className="leftTop" style={styles.inner1}></div>
          <div className="leftLowerRight" style={styles.inner2}></div>
          <div style={styles.inner3}></div>
          <div className="rightTop" style={styles.innerRight1}></div>
      </div>

    );
  }
}

Feed.propTypes = {
  data: PropTypes.object,
  newLike: PropTypes.func
};

const mapStateToProps = (state) => ({
  data: state.discoverReducer
});

const mapDispatchToProps = (dispatch) => ({
  newLike: (id) => dispatch({type: 'NEW_LIKE', postId: id})
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
