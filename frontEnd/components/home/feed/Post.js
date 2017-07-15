// comment button action renders modal

import React from 'react';
// import Modal from './Modal';
import PropTypes from 'prop-types';
// import {Link, Route} from 'react-router-dom';

// TODO on action of comment button dispatch modal
// TODO pass postData down

const Post = ({postData, newLike}) => {
  const commentNum = postData.comments.length;
  return (
    <div style={{width: '85%', margin: '0 auto'}}>
      <div className="row" style={{marginBottom: '0'}}>
        <div style={{width: '50%', display: 'block', margin: 'auto'}}>
          <div className="card blue-grey lighten-5">
            <div className="card-content black-text" style={{paddingTop: '0'}}>
              <span className="card-title hashtags"
                style={{textAlign: 'center', marginBottom: '0'}}>
                {postData.tags.map(tag => (<text style={{fontSize: '14'}}><text
                  style={{color: '#0D9ED3', fontSize: '20'}}>#</text>{tag}   </text>))}</span>
              <img style={{borderRadius: '50%', float: 'left', height: '40'}}
                src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg"
                alt="5" />
              <div style={{marginLeft: '20'}}>
                <span className="card-title"
                  style={{float: 'left', paddingLeft: '30', fontSize: '20', fontWeight: 'bold'}}>
                  {postData.username}</span>
                <span className="card-title date" style={{float: 'right', fontSize: '10'}}>
                  {postData.createdAt.slice(11, 16)}</span>
              </div>
            </div>
            <p style={{clear: 'both', paddingLeft: '40', paddingTop: '10'}}>
              {postData.content}</p>
            <div className="card-action" style={{paddingBottom: '50'}}>
              <div>
                <a style={{backgroundColor: '#0D9ED3', float: 'left'}}
                  className="waves-effect waves-light btn"
                  onClick={() => (newLike)}><i
                    className="material-icons left">thumb_up</i>5</a>
              </div>
              <div>
                <a style={{backgroundColor: '#0D9ED3', float: 'right'}}
                  className="waves-effect waves-light btn"><i
                    className="material-icons left" href="#modal1">comment</i>{commentNum}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
  newLike: PropTypes.func,
};

export default Post;
