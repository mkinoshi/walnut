import React from 'react';
import PropTypes from 'prop-types';
import Metascraper from 'metascraper';
import axios from 'axios';

class LinkPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {}
    };
  }

  componentWillMount() {
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
    return (
       <div className="linkPreviewWrapper">
        {(bool && this.state.meta.image && this.state.meta.description) ?
        <div className="linkPreview">
            <a href={this.state.meta.url}><h3 className="linkTitle">{this.state.meta.title}</h3></a><br />
            <p className="linkDesc">{this.state.meta.description}</p><br />
            <div className="linkImage">
                <img className="linkImg" src={this.state.meta.image} />
            </div>
        </div>
        : <p>preview is loading</p>
        }
       </div>
        );
  }
}
LinkPreview.propTypes = {
  url: PropTypes.string
};

export default LinkPreview;


// description;
// 'Create an account or log into Facebook. Connect with friends, family and other people you know. Share photos and videos, send messages and get updates.';

// image;
// 'https://www.facebook.com/images/fb_icon_325x325.png';

// publisher;
// 'Facebook';

// title;
// 'Facebook - Log In or Sign Up';

// url;
// 'https://www.facebook.com/'
// ;
