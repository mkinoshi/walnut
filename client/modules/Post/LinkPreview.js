import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import YouTube from 'react-youtube';
import { Grid } from 'semantic-ui-react';

class LinkPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {},
      youtube: ''
    };
  }

  componentWillMount() {
    if (this.props.url.split('.')[1] === 'youtube') {
      this.setState({ youtube: this.props.url.split('v=')[1]});
      return;
    }
    axios.post('/db/get/linkpreview', {
      url: this.props.url
    })
    .then((response) => {
      this.setState({ meta: response.data.meta});
    })
    .catch((err) => {
      console.log('error in meta scrape', err);
    });
  }

  render() {
    const bool = Object.keys(this.state.meta).length > 0;
    const opts = {
      height: '270',
      width: '513',
      playerVars: {
        autoplay: 0
      }
    };
    return (
      <div className="linkPrev">
        <div className="lineLeft"></div>
        <div className="linkPreviewWrapper">
          {(bool && this.state.meta.image && this.state.meta.description) ?
          <div className="linkPreview">
              <a href={this.state.meta.url}><h3 className="linkTitle">{this.state.meta.title}</h3></a><br />
              <p className="linkDesc">{this.state.meta.description}</p><br />
              <div className="linkImage">
                  <img className="linkImg" src={this.state.meta.image} />
              </div>
          </div>
          : null
          }
          {(this.state.youtube !== '') ?
          <YouTube
              videoId={this.state.youtube}
              opts={opts}
              onReady={this._onReady}
          /> : null
          }
        </div>
      </div>
        );
  }
}
LinkPreview.propTypes = {
  url: PropTypes.string
};

export default LinkPreview;
