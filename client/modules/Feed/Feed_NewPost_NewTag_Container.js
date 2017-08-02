import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newTagThunk from '../../thunks/post_thunks/newTagThunk';

class NewTagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tag: ''};
  }


  handleClick(event) {
    event.preventDefault();
    this.props.addToPost(this.state.tag);
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
          this.handleClick(e);
        }} />
      </form>
    );
  }
}

NewTagContainer.propTypes = {
  addToPost: PropTypes.func
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTagContainer);
