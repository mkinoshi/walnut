
import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'semantic-ui-react';
import css from './Post.css';
import PDF from 'react-pdf-js';

const MediaAttachment = ({data, renderLightBox, renderPdfModal}) => {
  if(data.type === 'image/jpeg') {
    return (
            <div className="mediaAttachment" onClick={() => renderLightBox(data)}>
                <Image size="small" src={data.url}/><br/>
            </div>
        );
  }
  if(data.type === 'application/pdf') {
    return (
        <div className="mediaPDFAttachment" onClick={() => renderPdfModal(data)}>
        <PDF className="pdfThumb" rotate={90} file={data.url} page={1} />
            <p>{data.name}</p>
        </div>
    );
  }
  return null;
};

MediaAttachment.propTypes = {
  data: PropTypes.object,
  renderLightBox: PropTypes.func,
  renderPdfModal: PropTypes.func
};

export default MediaAttachment;
