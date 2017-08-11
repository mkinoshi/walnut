import React from 'react';
import PropTypes from 'prop-types';
import PDF from 'react-pdf-js';
import './EditProfile.css';


class MyPdfViewer extends React.Component {

  render() {
    return (
      <div className="pdfViewer">
        <PDF rotate={90} file={this.props.file} onDocumentComplete={(e) => this.props.onDocumentComplete(e)}
            onPageComplete={(e) => this.props.onPageComplete(e)} page={this.props.page} />
      </div>
    );
  }
}

MyPdfViewer.propTypes = {
  file: PropTypes.string,
  page: PropTypes.number,
  onDocumentComplete: PropTypes.func,
  onPageComplete: PropTypes.func
};

module.exports = MyPdfViewer;
