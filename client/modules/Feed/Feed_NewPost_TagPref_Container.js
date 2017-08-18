// dispatches filter preferences

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Creatable}  from 'react-select';
import { Icon, Button, Label } from 'semantic-ui-react';
import newTagThunk from '../../thunks/post_thunks/newTagThunk';

// TODO Filter component box style
// TODO button onClick dispatches toggleChecked(index) 17

class TagPref extends React.Component {
  constructor() {
    super();
    this.state = {
      value: []
    };
  }

  handleSelectChange(obj) {
    // if (value.trim().length > 0) {
    this.setState({obj});
    console.log(obj);
    if (obj) {
      const options = obj.value.replace(/\W/g, '');
      console.log('hehehehehhehehe', options);
      const send = this.props.otherFilters.filter((filter) => options === filter.name);
      if (send.length === 0) {
        this.props.addNewTags(options);
      } else {
        this.props.addTags(send);
      }
      // this.props.addTags(send);
      this.setState({value: []});
    }
  }

  // handleKeyPress(event) {
  //   if(event.key == 'Enter') {
  //     console.log(event);
  //     console.log('clicked');
  //     console.log(this.state.value);
  //   }
  // }

  handleNew(value) {
    event.preventDefault();
    console.log('this.state.value', this.state.value);
    // make sure not to have empty strings
    if (value) {
      const options = this.state.value.map((obj) => {return obj.value.replace(/\W/g, '');});
      console.log('hehehehehhehehe', options);
      // const options = this.state.value.split(',');
      // send is an array that only includes the objects that are being added
      options.forEach((newTag) => {
        const send = this.props.otherFilters.filter((filter) => newTag === filter.name);
        console.log('here', send);
        if (send.length === 0) {
          this.props.newTagThunk(newTag);
        } else {
          this.props.addTags(send);
        }
      });
      // this.props.addTags(send);
      this.setState({value: []});
    }
  }

  handleChange(e) {
    this.props.addNewTags(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    console.log('all of the tags here');
    return (
      <div>
        {this.props.tags || this.props.newtags ?
          this.props.tags.concat(this.props.newtags).map((filter, index) => (
                <p key={index}>
                  <Label image>
                    # {typeof filter === 'string' ? filter : filter.name}
                    <Icon name="delete" onClick={() => this.props.handleRemove(filter)} />
                  </Label>
                </p>
              )) :
          null
        }
          <Creatable
              className="searchTags"
              name="form-field-name"
              placeholder="Select Tag or Type your own..."
              value={this.state.value}
              clearable
              options={this.props.otherFilters.map((tag) => {
                return {value: tag.name, label: '#' + tag.name};
              })}
              onChange={(e) => this.handleSelectChange(e)}
          />
      </div>
    );
  }
}

TagPref.propTypes = {
  defaultFilters: PropTypes.array,
  otherFilters: PropTypes.array,
  addTags: PropTypes.func,
  tags: PropTypes.array,
  addTempTags: PropTypes.func,
  tempTags: PropTypes.array,
  newTags: PropTypes.array,
  newTagThunk: PropTypes.func,
  addNewTags: PropTypes.func,
  handleRemove: PropTypes.func,
  newtags: PropTypes.array
};

const mapStateToProps = (state) => ({
  otherFilters: state.discoverReducer.otherFilters,
  newTags: state.newTagsReducer
});

const mapDispatchToProps = (dispatch) => ({
  newTagThunk: (tag) => dispatch(newTagThunk(tag))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagPref);


 // style={{float: 'left', clear: 'both', padding: '5%', paddingTop: '40'}}
