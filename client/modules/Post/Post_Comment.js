import React from 'react';
import PropTypes from 'prop-types';
import ModalContainer from './Post_Modal_Container';
import { Card, Icon, Image, Button, Modal, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import css from './Post.css';


class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: this.props.likes.length,
      isLiked: this.props.likes.indexOf(this.props.currentUser._id) > 0,
    };
  }

  toggleLike() {
    console.log('hi');
    this.props.newCommentLike();
    if (this.state.isLiked) {
      this.setState({likeCount: this.state.likeCount - 1, isLiked: false});
    } else {
      this.setState({likeCount: this.state.likeCount + 1, isLiked: true});
    }
  }

  render() {
    return (
      <Card className="commentWidth commentColor">
        <Card.Content >
          <Image floated="left" size="mini" src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" />
            <Card.Header>
              {this.props.username}
            </Card.Header>
            <Card.Meta>
              {this.props.createdAt.slice(11, 16)}
            </Card.Meta>
            <Card.Description>
              {this.props.content}
            </Card.Description>
            <a onClick={() => this.toggleLike()}>
              <Icon name="thumbs outline up" />
              {this.state.likeCount}
            </a>
        </Card.Content>
      </Card>
    );
  }
}

Comment.propTypes = {
  postData: PropTypes.object,
  newLike: PropTypes.func,
  likes: PropTypes.array,
  currentUser: PropTypes.object,
  newCommentLike: PropTypes.func,
  username: PropTypes.string,
  createdAt: PropTypes.string,
  content: PropTypes.string
};

export default Comment;
