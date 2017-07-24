import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NewTagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tag: ''};
  }


  handleClick(event) {
    event.preventDefault();
    console.log('trying to add a new tag');
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

NewTagContainer.propTypes = {
  addNewTag: PropTypes.func
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  addNewTag: (tag) => dispatch(
    {type: 'NEW_TAG', tag: tag})
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTagContainer);
