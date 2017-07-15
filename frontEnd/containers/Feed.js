// maps through posts and renders Post
// connect
import React from 'react';
import { connect } from 'react-redux';
import Post from '../components/home/feed/Post';
import PropTypes from 'prop-types';
import Modal from 'react-modal';


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: true,
    };
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
    const filteredPosts = this.filterData(this.props.data).posts;
    return (
      <div>
        <h1>I am the feed</h1>
        {filteredPosts.map((post) => (
          <div>
            <Post postData={post} onClick={() => this.setState({modalState: true})}/>
          </div>
        ))}
        <h1>hellooooooo</h1>
        <Modal isOpen={this.state.modalState} contentLabel="Modal">
          This is a modal
          <button onClick={() => {this.setState({modalState: false});}}>Close</button>
        </Modal>
      </div>
    );
  }
}

Feed.propTypes = {
  data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  data: state.discoverReducer
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
