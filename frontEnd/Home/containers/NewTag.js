// adds a new tag, lives on the new post

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NewTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tag: ''};
  }

  handleClick(event) {
    event.preventDefault();
    this.props.addNewTag(this.state.tag);
    this.setState({tag: ''});
  }

  render() {
    return (
      <form>
        <input type="text"
          value={this.state.tag}
          placeholder="Type new tag"
          onChange={(e) => this.setState({tag: e.target.value})}/>
        <input type="submit" value="Add" onClick={(e, tag) => {
          console.log('hi');
          this.handleClick(e);
        }} />
      </form>
    );
  }
}

NewTag.propTypes = {
  addNewTag: PropTypes.func
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  addNewTag: (tag) => dispatch(
    {type: 'NEW_TAG', tag: tag})
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTag);
