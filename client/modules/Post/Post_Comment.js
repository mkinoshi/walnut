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
    };
  }

  // toggleLike() {
  //   this.props.newCommentLike();
  //   if (this.state.isLiked) {
  //     this.setState({likeCount: this.state.likeCount - 1, isLiked: false});
  //   } else {
  //     this.setState({likeCount: this.state.likeCount + 1, isLiked: true});
  //   }
  // }

  render() {
    return (
      <Card className="commentWidth commentColor">
        <Card.Content >
          <Image floated="left" size="mini" src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" />
            <Card.Header>
              {this.props.name}
            </Card.Header>
            <Card.Meta>
              {this.props.createdAt}
            </Card.Meta>
            <Card.Description>
              {this.props.content}
            </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

Comment.propTypes = {
  postData: PropTypes.object,
  name: PropTypes.string,
  createdAt: PropTypes.string,
  content: PropTypes.string
};

export default Comment;
