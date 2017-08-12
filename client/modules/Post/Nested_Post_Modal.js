/**
 * Created by ebadgio on 8/8/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post_index';
import './Post.css';
import { Button, Modal } from 'semantic-ui-react';


class NestedPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
        <Modal size={'small'} basic trigger={<Button>Show Post</Button>}
               closeIcon="close">
            <Modal.Content image scrolling className="scrollContentClass">
                <Post
                    nested
                    currentUser={this.props.currentUser}
                    postData={this.props.postData} />
            </Modal.Content>
        </Modal>
    );
  }
}
NestedPostModal.propTypes = {
  postData: PropTypes.object,
  currentUser: PropTypes.object
};

export default NestedPostModal;
