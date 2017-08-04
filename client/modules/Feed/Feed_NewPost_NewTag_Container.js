import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button, Input } from 'semantic-ui-react';

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
        <Input
          value={this.state.tag}
          placeholder="Type new tag"
          onChange={(e) => this.setState({tag: e.target.value})}/>
          <Button animated="vertical" id="addTagButton" onClick={(e, tag) => {this.handleClick(e);}}>
          <Button.Content visible>Add new</Button.Content>
          <Button.Content hidden>
            <Icon name="hashtag" />
          </Button.Content>
          </Button>
      </form>
    );
  }
}

NewTagContainer.propTypes = {
  addToPost: PropTypes.func
};

export default NewTagContainer;
