import React from 'react';
import PropTypes from 'prop-types';
import ModalContainer from './Post_Modal_Container';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const styles = {
  post: {
    width: '30%',
  }
};


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      likeCount: this.props.postData.likes.length,
      isLiked: this.props.postData.likes.indexOf(this.props.currentUser._id) > 0
    };
  }

  handleClick() {
    this.setState({isOpen: !this.state.isOpen});
  }

  toggleLike() {
    if (this.state.isLiked) {
      this.props.newLike();
      this.setState({likeCount: this.state.likeCount - 1, isLiked: false});
    } else {
      this.props.newLike();
      this.setState({likeCount: this.state.likeCount + 1, isLiked: true});
    }
  }

  render() {
    console.log(this.props.postData);
    return (
      <Card style={styles.post}>
      <Card.Content>
        <Image floated="left" size="mini" src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" />
        <Card.Header>
          {this.props.postData.username}
        </Card.Header>
        <Card.Meta>
          {this.props.postData.tags.map((tag, index) => {return tag.name;})}
        </Card.Meta>
        <Card.Description>
          {this.props.postData.content}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">Approve</Button>
          <Button basic color="red">Decline</Button>
        </div>
      </Card.Content>
    </Card>
    );
  }
}


Post.propTypes = {
  postData: PropTypes.object,
  newLike: PropTypes.func,
  currentUser: PropTypes.object
};

export default Post;
