// comment button action renders modal

import React from 'react';
import PropTypes from 'prop-types';
// import {Link, Route} from 'react-router-dom';
import ModalContainer from './Post_Modal_Container';


// TODO on action of comment button dispatch modal
// TODO pass postData down

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  handleClick() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    const commentNum = this.props.postData.comments.length;
    return (
      <div className="card" style={{backgroundColor: '#ececec', width: '100%', float: 'right', marginRight: '2%'}}>
        <div style={{textAlign: 'center'}}>
          {this.props.postData.tags.map((tag, index) => (<text key={index} style={{fontSize: '14px'}}><text
                    style={{color: '#0D9ED3', fontSize: '14px'}}>#</text>{tag.name}   </text>))}
        </div>
        <div className="card-block">
          <span>
          <img style={{borderRadius: '50%', float: 'left', height: '40px'}}
                  src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg"
                  alt="5" />
          <h4 className="card-title" style={{fontSize: '14px'}}>{this.props.postData.username}</h4> </span>
          <p className="card-text" style={{paddingLeft: '10%'}}><br/>{this.props.postData.content}</p>
          <div>
            <a style={{backgroundColor: '#0D9ED3', float: 'left'}}
              className="waves-effect waves-light btn btn-primary"
              onClick={() => this.props.newLike()}><i
                className="material-icons left">thumb_up</i>{this.props.postData.likes.length}</a>
          </div>
          <div>
            <a style={{backgroundColor: '#0D9ED3', float: 'right'}}
              className="waves-effect waves-light btn btn-primary" onClick={() => this.handleClick()}><i
                className="material-icons left">comment</i>{commentNum}</a>
          </div>
          <br/> <br/>
          <ModalContainer isOpen={this.state.isOpen} postData={this.props.postData} onClick={() => this.handleClick()}/>
        </div>
      </div>

    );
  }
}


Post.propTypes = {
  postData: PropTypes.object,
  newLike: PropTypes.func,
};

export default Post;
