
import React from 'react';
import PropTypes from 'prop-types';
import {Image, Card, Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import css from './Post.css';
import PDF from 'react-pdf-js';
import { Player } from 'video-react';

class MediaAttachment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverDownloadCard: false
    };
  }

  toggleDownloadHover() {
    this.setState({hoverDownloadCard: !this.state.hoverDownloadCard});
  }

  whatShouldIRender() {
    if(this.props.data.type === 'image/jpeg' || this.props.data.type === 'image/png') {
      return (
          <div className="mediaAttachment" >
              <Image onClick={() => this.props.renderLightBox(this.props.data)} size="medium" src={this.props.data.url}/><br/>
          </div>
      );
    }
    if(this.props.data.type === 'application/pdf') {
      return (
          <div className="mediaPDFAttachment" onClick={() => this.props.renderPdfModal(this.props.data)}>
            <PDF className="pdfThumbOut" file={this.props.data.url} page={1} />
          </div>
      );
    }
    if (this.props.data.type === 'video/mp4' || this.props.data.type === 'video/quicktime' || this.props.data.type === 'video/mov') {
      return (
          <div className="mediaVideoAttachment">
              <Player>
               <source src={this.props.data.url}/>
              </Player>
          </div>
      );
    }
    if(this.props.data.type === 'text/javascript') {
      return (
          <div className="mediaDownloadAttachment">
            <Card className="downloadCard" onMouseEnter={() => this.toggleDownloadHover()} onMouseLeave={() => this.toggleDownloadHover()}>
              <Icon name="file code outline" size="huge"/>
              <p>{this.props.data.name}</p>
              <a className="downloadButton" href={this.props.data.url}> {this.state.hoverDownloadCard ? <Icon name="cloud download" size="big" /> : null}</a>
            </Card>
          </div>
      );
    }
    return (
        <div className="mediaDownloadAttachment">
          <Card className="downloadCard" onMouseEnter={() => this.toggleDownloadHover()} onMouseLeave={() => this.toggleDownloadHover()}>
              <Icon name="file outline" size="huge" className="downloadFileIcon"/>
              <p className="downloadFileName">{this.props.data.name}</p>
              <a className="downloadButton" href={this.props.data.url}> {this.state.hoverDownloadCard ? <Icon name="cloud download" size="big" /> : null}</a>
          </Card>
        </div>
    );
  }

  render() {
    const snippet = this.whatShouldIRender();
    return (
        <div>
            {snippet}
        </div>
        );
  }
}

MediaAttachment.propTypes = {
  data: PropTypes.object,
  renderLightBox: PropTypes.func,
  renderPdfModal: PropTypes.func,
  askDownload: PropTypes.func
};

export default MediaAttachment;
