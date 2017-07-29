import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import { connect } from 'react-redux';
import removeFileThunk from '../../thunks/user_thunks/removeFileThunk';
import {Image, Card, Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class UploadsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sneakyFront: [],
      files: [],
      onEdit: false,
      editFiles: false,
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
          console.log('save success', res.body.portfolio);
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

  editFiles() {
    this.setState({editFiles: !this.state.editFiles});
  }

  removeFile(i) {
    this.props.removeFile(this.props.tab, i);
  }

  render() {
    const portArr = (this.state.sneakyFront.length > 0) ? this.state.sneakyFront.filter((i) => (this.props.tab === i.name)) :
    this.props.portfolio.filter((i) => (this.props.tab === i.name));
    const filesArr = portArr[0] ? portArr[0].data : [];
    return (
          <div className="col-xs-12">
            <div className="row col-xs-12 settingsUploads">
              <Icon onClick={() => this.editFiles()} name="setting" size="big" />
            </div>
            <div className="row col-xs-12 fileCards">
              {filesArr.map((file, i) => {
                if (file.fileType !== 'application/pdf' && file.fileType !== 'image/png') {
                  return (
                    <Card className="fileContainer">
                      <div key={i}>
                        {this.state.editFiles ? <p onClick={() => this.removeFile(i)}>D</p> : null}
                        <a href={file.fileUrl}>
                          <div
                            className="files">
                            <img className="picThumb"
                            src={this.thumbChoice(file)}/>
                            <p className="fileName">{file.fileName}</p>
                          </div>
                        </a>
                      </div>
                    </Card>
                  );
                }
                return (
                  <Card className="fileContainer">
                    <div key={i}>
                    {this.state.editFiles ? <p onClick={() => this.removeFile(i)}>D</p> : null}
                      <div
                        className="files"
                        onClick={() => (this.props.renderFile(file))}>
                        <img className="picThumb"
                        src={this.thumbChoice(file)}/>
                        <p className="fileName">{file.fileName}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="row col-xs-12 addFile">
              <Dropzone
              className="dropzone"
              onDrop={this.onDrop.bind(this)} multiple>
                <Icon name="add circle" inverted className="dropIcon" size="big" color="black"/>
              </Dropzone>
              {this.state.files.map((file, i) => (
                <input key={i}
                value={file.newName || file.name}
                onChange={(e) => (this.nameChange(e.target.value, i))}/>
              ))}
              {this.state.onEdit ? <button onClick={() => {this.uploadFiles();}}>Upload</button> : null}
            </div>
          </div>
      );
  }
}

UploadsContainer.propTypes = {
  portfolio: PropTypes.array,
  tab: PropTypes.string,
  userId: PropTypes.string,
  renderFile: PropTypes.func,
  removeFile: PropTypes.func
};

const mapStateToProps = (state) => ({
  portfolio: state.userReducer.portfolio,
  userId: state.userReducer._id,
});

const mapDispatchToProps = (dispatch) => ({
  removeFile: (tab, i) => removeFileThunk(tab, i)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadsContainer);
