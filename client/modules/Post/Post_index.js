import React from 'react';
import PropTypes from 'prop-types';
import ModalContainer from './Post_Modal_Container';
import { Card, Icon, Image, Button, Modal, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import css from './Post.css';
import MediaAttachment from './Post_Media_Attachment.js';
import Lightbox from 'react-images';
import PDF from 'react-pdf-js';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      likeCount: this.props.postData.likes.length,
      isLiked: this.props.postData.likes.indexOf(this.props.currentUser._id) > 0,
      lightBoxData: '',
      pdfModalData: '',
      page: 1,
      pages: 100
    };
  }

  handleClick() {
    this.setState({isOpen: !this.state.isOpen});
  }

  toggleLike() {
    this.props.newLike();
    if (this.state.isLiked) {
      this.setState({likeCount: this.state.likeCount - 1, isLiked: false});
    } else {
      this.setState({likeCount: this.state.likeCount + 1, isLiked: true});
    }
  }

  renderLightBox(data) {
    this.setState({lightBoxData: data});
  }

  closeLightbox() {
    this.setState({lightBoxData: ''});
  }

  renderPdfModal(data) {
    this.setState({pdfModalData: data});
  }

  closeModal() {
    this.setState({ pdfUrl: '', page: 1 });
  }

  handlePrevious() {
    if(this.state.page === 1) {
      this.setState({ page: this.state.pages });
    } else {
      this.setState({ page: this.state.page - 1 });
    }
  }

  handleNext() {
    if(this.state.page === this.state.pages) {
      this.setState({ page: 1 });
    } else {
      this.setState({ page: this.state.page + 1 });
    }
  }

  onDocumentComplete(pages) {
    this.setState({ page: 1, pages: pages });
  }

  onPageComplete(page) {
    this.setState({ page: page });
  }

  closePdfModal() {
    this.setState({pdfModalData: ''});
  }

  closeDownloadModal() {
    this.setState({downloadUrl: ''});
  }

  render() {
    return (
      <div className="postOuter" >
      <div className="postContent">
        <div className="postUser">
          <div className="imageWrapper">
            <img className="postUserimage" src="http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg" />
          </div>
          <div className="postHeader">
            <h3 className="postHeaderUser">{this.props.postData.username}</h3>
          </div>
        </div>
        <div className="postDiscription">
          <p className="postInnerContent">{this.props.postData.content}</p>
        </div>

        {(this.props.postData.attachment.name !== '') ?
        <MediaAttachment data={this.props.postData.attachment}
        renderLightBox={(data) => this.renderLightBox(data)}
        renderPdfModal={(data) => this.renderPdfModal(data)}/>
        : null}

        {(this.state.lightBoxData !== '') ?
        <Lightbox
          images={[{
            src: this.state.lightBoxData.url,
            caption: this.state.lightBoxData.name
          }]}
          isOpen={this.state.lightBoxData !== ''}
          onClose={() => this.closeLightbox()}
          /> : null
        }

        <Modal
        open={this.state.pdfModalData !== ''}
        basic
        size="small"
        onClose={() => this.closePdfModal()}>
          <Header icon="archive" content={this.state.pdfModalData.name} />
          <Modal.Content>
          <PDF rotate={90} file={this.state.pdfModalData.url} onDocumentComplete={(e) => this.onDocumentComplete(e)}
            onPageComplete={(e) => this.onPageComplete(e)} page={this.state.page} />
          </Modal.Content>
          <Modal.Actions className="pdfModalFooter">
            <Button onClick={(e) => {e.preventDefault(); this.handlePrevious();}} basic color="red" inverted>
              <Icon name="caret left" /> Prev
            </Button>
            <Button onClick={(e) => {e.preventDefault(); this.handleNext();}} basic color="green" inverted>
              Next <Icon name="caret right" />
            </Button>
          </Modal.Actions>
        </Modal>

      </div>
      <div className="postFootnote">
        <div className="postMeta">
          <div className="tagContainer">
            {this.props.postData.tags.map((tag, index) => (
            <div key={index} className="tag">
              <text className="hashtag">#{tag.name}</text>
            </div>))}
          </div>
          {!this.props.isOpen ? <ModalContainer postData={this.props.postData} currentUser={this.props.currentUser}/>
        : <a className="commentButton">
            <span> <Icon name="comment outline" />
            {this.props.postData.comments.length} </span>
          </a>}
      </div>
        </div>
      {/* <ModalContainer isOpen={this.state.isOpen} postData={this.props.postData} onClick={() => this.handleClick()}/> */}
    </div>
    );
  }
}

Post.propTypes = {
  postData: PropTypes.object,
  newLike: PropTypes.func,
  currentUser: PropTypes.object,
  isOpen: PropTypes.bool
};

export default Post;
