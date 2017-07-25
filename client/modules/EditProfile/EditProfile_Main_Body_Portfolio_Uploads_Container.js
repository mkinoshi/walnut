import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import { connect } from 'react-redux';

class UploadsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sneakyFront: {},
      files: [],
      onEdit: false
    };
  }

  onDrop(files) {
    console.log('files', files[0]);
    this.setState({files: this.state.files.concat(files), onEdit: true});
  }

  nameChange(update, i) {
    const filesArr = this.state.files.slice();
    filesArr[i].newName = update || '';
    this.setState({files: filesArr});
  }

  uploadFiles() {
    const files = this.state.files.slice();
    files.forEach((file) => {
      superagent.post('/aws/upload/portfolio')
        .attach('portfolio', file)
        .query('port=' + this.props.tab + '&&name=' + (file.newName || file.name))
        .end((err, res) => {
          if (err) {
            console.log(err);
            alert('failed uploaded!');
          }
          this.setState({sneakyFront: res.body.portfolio, files: [], onEdit: false});
        });
    });
  }

  thumbChoice(file) {
    if(file.fileType === 'image/png') {
      return 'https://maxcdn.icons8.com/Share/icon/ios7/Files//image_file1600.png';
    }
    if(file.fileType === 'application/pdf') {
      return 'https://d30y9cdsu7xlg0.cloudfront.net/png/67120-200.png';
    }
    return 'https://maxcdn.icons8.com/Share/icon/Network//download_from_cloud1600.png';
  }

  render() {
    const filesArr = (Object.keys(this.state.sneakyFront).length > 0) ? this.state.sneakyFront[this.props.tab] : this.props.portfolio[this.props.tab];
    return (
          <div className="col-xs-12">
            {filesArr.map((file, i) => {
              if (file.fileType !== 'application/pdf' && file.fileType !== 'image/png') {
                return (
                  <a key={i} href={file.fileUrl}>
                  <div
                    className="col-xs-4 files">
                    <img className="picThumb"
                    src={this.thumbChoice(file)}/>
                    <p>{file.fileName}</p>
                  </div>
                  </a>
                );
              }
              return (
                <div key={i}
                  className="col-xs-4 files"
                  onClick={() => (this.props.renderFile(file))}>
                  <img className="picThumb"
                  src={this.thumbChoice(file)}/>
                  <p>{file.fileName}</p>
                </div>
              );
            })}
            <Dropzone
            className="col-xs-4 dropzone"
            onDrop={this.onDrop.bind(this)} multiple={true}>
              <div>Click/drop --> upload</div>
            </Dropzone>
            {this.state.files.map((file, i) => (
              <input key={i}
              value={file.newName || file.name}
              onChange={(e) => (this.nameChange(e.target.value, i))}/>
            ))}
            {this.state.onEdit ? <button onClick={() => {this.uploadFiles();}}>Upload</button> : null}
          </div>
      );
  }
}

UploadsContainer.propTypes = {
  portfolio: PropTypes.object,
  tab: PropTypes.string,
  userId: PropTypes.string,
  renderFile: PropTypes.func
};

const mapStateToProps = (state) => ({
  portfolio: state.userReducer.portfolio,
  userId: state.userReducer._id
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadsContainer);
