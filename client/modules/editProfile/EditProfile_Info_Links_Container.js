import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveLinksThunk from '../../thunks/profile_thunks/saveLinksThunk';
import Paper from 'material-ui/Paper';

const styles = {
  links: {
    backgroundColor: '#fff',
    width: 'auto',
    height: 'auto',
    minWidth: '200px',
    paddingLeft: '10%',
    marginLeft: '100px',
    marginRight: 'auto'
  }
};


class LinksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit,
      links: this.props.links
    });
  }

  add() {
    this.setState({links: this.state.links.concat([''])});
  }

  changeLinks(link, i) {
    if (link === '') {
      return;
    }
    const obj = JSON.parse(JSON.stringify(this.state));
    obj.links[i] = link;
    this.setState(obj);
  }

  handleSave() {
    this.setState({edit: false});
    this.props.saveLinks(this.state.links);
  }

  render() {
    return (
      <Paper style={styles.links}>
        <h1>Links</h1>
        <p onClick={() => (this.toggleEdit())}>E</p>
        {this.state.edit ?
        <p onClick={() => (this.add())}>Add</p> : <p></p>}
        {this.state.links ?
          this.state.links.map((link, i) => {
            return this.state.edit ?
          <input key={i} value={link} onChange={(e) => this.changeLinks(e.target.value, i)}/>
            :
          <div key={i}>
          <a href={link}>{
            link.includes('www.') ? link.split('//')[1].split('.')[1] :
            link.split('//')[1].split('.')[0]}</a></div>;
          })
        :
        this.props.links.map((link, i) => (
          <div key={i}>
          <a href={link}>{
            link.includes('www.') ? link.split('//')[1].split('.')[1] :
            link.split('//')[1].split('.')[0]}</a></div>
        ))
      }
        {this.state.edit ?
          <a style={{backgroundColor: '#0D9ED3', float: 'right'}}
            className="waves-effect waves-light btn"
            onClick={() => this.handleSave()}>
            save</a>
          :
        <p></p>}
      </Paper>
    );
  }
}

LinksContainer.propTypes = {
  links: PropTypes.array,
  saveLinks: PropTypes.func
};

const mapStateToProps = (state) => ({
  links: state.userReducer.links,
});

const mapDispatchToProps = (dispatch) => ({
  saveLinks: (links) => saveLinksThunk(links)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LinksContainer);
