// dispatches filter preferences

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO Filter component box style
// TODO button onClick dispatches toggleChecked(index) 17

class TagPref extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsArray: []
    };
  }

  handleChange(e) {
    const tagsCopy = this.state.tagsArray.slice();
    if(!tagsCopy.includes(e.target.value)) {
      tagsCopy.push(e.target.value);
      this.setState({tagsArray: tagsCopy});
      this.props.addTags(tagsCopy);
    } else{
      const index = tagsCopy.indexOf(e.target.value);
      tagsCopy.splice(index, 1);
      this.setState({tagsArray: tagsCopy});
      this.props.addTags(tagsCopy);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form name="choice_form" id="choice_form" method="post" onSubmit={this.handleSubmit}>
          {this.props.filters.map((filter) => (
            <div>
              <input type="checkbox" id={filter.name}
                checked={(this.state.tagsArray.includes(filter.name)) ? 'checked' : ''}
                value={filter.name}
                onChange={(e) => (this.handleChange(e))}
                />
              <label htmlFor={filter.name}># {filter.name}</label>
            </div>
            ))}
        </form>
      </div>
    );
  }
}

TagPref.propTypes = {
  filters: PropTypes.array,
  addTags: PropTypes.func,
  tagsArray: PropTypes.array
};

const mapStateToProps = (state) => ({
  filters: state.discoverReducer.filters
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TagPref);


 // style={{float: 'left', clear: 'both', padding: '5%', paddingTop: '40'}}
