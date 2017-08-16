
import React from 'react';
import PropTypes from 'prop-types';
import {Image, Card, Icon} from 'semantic-ui-react';
import './Post.css';
import fileDownload from 'react-file-download';

class MediaAttachment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverDownloadCard: false
    };
  }

  toggleDownloadHover() {
    this.setState({ hoverDownloadCard: !this.state.hoverDownloadCard});
  }

  downloadS3(url, name) {
    console.log('url download', url, name);
    fileDownload(url, name);
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
        <div className="mediaDownloadAttachment">
            <Card className="downloadCard" onMouseEnter={() => this.toggleDownloadHover()} onMouseLeave={() => this.toggleDownloadHover()}>
            <Icon id="mediaIcon" name="file pdf outline" size="huge"/>
            <p className="downloadFileName">{this.props.data.name}</p>
               {this.state.hoverDownloadCard ?
            <div className="pdfIcons">
              <a href={this.props.data.url} target="pdf-frame"><Icon className="viewButtonPDF" name="eye" size="big" /></a>
              <a href={this.props.data.url} download><Icon className="downloadButtonPDF" name="cloud download" size="big" /></a>
            </div>
              : null }
            </Card>
          </div>
      );
    }
    if (this.props.data.type === 'video/mp4' || this.props.data.type === 'video/quicktime' || this.props.data.type === 'video/mov') {
      return (
        <div className="mediaDownloadAttachment">
          <Card className="downloadCard" onMouseEnter={() => this.toggleDownloadHover()} onMouseLeave={() => this.toggleDownloadHover()}>
            <Icon id="mediaIcon" name="file video outline" size="huge" />
            <p className="downloadFileName">{this.props.data.name}</p>
            {this.state.hoverDownloadCard ? <Icon onClick={() => this.downloadS3(this.props.data.url, this.props.data.name)} className="downloadButton" name="cloud download" size="big" /> : null}
          </Card>ki
        </div>
      );
    }
    if(this.props.data.type === 'text/javascript') {
      return (
          <div className="mediaDownloadAttachment">
            <Card className="downloadCard" onMouseEnter={() => this.toggleDownloadHover()} onMouseLeave={() => this.toggleDownloadHover()}>
            <Icon id="mediaIcon" name="file code outline" size="huge"/>
              <p className="downloadFileName">{this.props.data.name}</p>
              {this.state.hoverDownloadCard ? <Icon onClick={() => this.downloadS3(this.props.data.url, this.props.data.name)} className="downloadButton" name="cloud download" size="big" /> : null}
            </Card>
          </div>
      );
    }
    return (
        <div className="mediaDownloadAttachment">
          <Card className="downloadCard" onMouseEnter={() => this.toggleDownloadHover()} onMouseLeave={() => this.toggleDownloadHover()}>
          <Icon id="mediaIcon" name="file outline" size="huge" className="downloadFileIcon"/>
              <p className="downloadFileName">{this.props.data.name}</p>
              {this.state.hoverDownloadCard ? <Icon onClick={() => this.downloadS3(this.props.data.url, this.props.data.name)} className="downloadButton" name="cloud download" size="big" /> : null}
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
