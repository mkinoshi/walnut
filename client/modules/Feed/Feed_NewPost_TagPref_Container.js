// dispatches filter preferences

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';

// TODO Filter component box style
// TODO button onClick dispatches toggleChecked(index) 17

class TagPref extends React.Component {
  constructor() {
    super();
    this.state = {
      value: []
    };
  }

  handleSelectChange(value) {
    console.log('select values', value, typeof(value), value.split(','));
    this.setState({value});
  }

  handleNew(event) {
    event.preventDefault();
    console.log('state', this.state.value);
    const options = this.state.value.split(',');
    const send = this.props.otherFilters.filter((filter) => (options.indexOf(filter.name) > -1));
    console.log('send', send);
    this.props.addTempTags(send);
    this.setState({value: []});
  }

  handleChange(e) {
    this.props.addTags(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {this.props.defaultFilters.map((filter, index) => (
            <div key={index}>
              <input type="checkbox" id={filter.name}
                checked={(this.props.tags.includes(filter._id)) ? 'checked' : ''}
                value={filter._id}
                onClick={(e) => {this.handleChange(e);}}
              />
              <label htmlFor={filter.name}># {filter.name}</label>
            </div>
            ))}
            {this.props.tempTags.map((tag, idx) => (
                <div key={idx}>
                  <input type="checkbox"
                         id={tag.name}
                         checked={(this.props.tags.includes(tag._id)) ? 'checked' : ''}
                         value={tag._id}
                         onClick={(e) => {this.handleChange(e);}}
                  />
                  <label htmlFor={tag.name}># {tag.name}</label>
                </div>
            ))}
            {this.props.newTags.map((tag, idx) => (
                <div key={idx}>
                  <input type="checkbox"
                         id={tag.name}
                         checked={(this.props.tags.includes(tag._id)) ? 'checked' : ''}
                         value={tag._id}
                         onClick={(e) => {this.handleChange(e);}}
                  />
                  <label htmlFor={tag.name}># {tag.name}</label>
                </div>
            ))}
        </form>
        <form onSubmit={(e) => this.handleNew(e)}>
          <Select
              name="form-field-name"
              value={this.state.value}
              multi simpleValue
              options={this.props.otherFilters.map((tag) => {
                return {value: tag.name, label: '#' + tag.name};
              })}
              onChange={this.handleSelectChange.bind(this)}
          />
          <button type="submit">Add Tag</button>
        </form>
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
  newTags: PropTypes.array
};

const mapStateToProps = (state) => ({
  defaultFilters: state.discoverReducer.defaultFilters,
  otherFilters: state.discoverReducer.otherFilters,
  newTags: state.newTagsReducer
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TagPref);


 // style={{float: 'left', clear: 'both', padding: '5%', paddingTop: '40'}}
