import React from 'react';
import PropTypes from 'prop-types';
import Uploads from './EditProfile_Main_Body_Portfolio_Uploads_Container';
import Lightbox from 'react-image-lightbox';
import PdfViewer from './EditProfile_Main_Body_Portfolio_Uploads_PDF.js';
import Modal from 'react-modal';
import css from './EditProfile.css';
import addUserPortTabsThunk from '../../thunks/user_thunks/addUserPortTabsThunk';
import updateUserPortTabsThunk from '../../thunks/user_thunks/updateUserPortTabsThunk';
import removeUserPortTabsThunk from '../../thunks/user_thunks/removeUserPortTabsThunk';
import { connect } from 'react-redux';

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'media',
      currUrl: '',
      pdfUrl: '',
      page: 1,
      pages: 100,
      currTabChange: '',
      newTab: false
    };
    this.onDocumentComplete = this.onDocumentComplete.bind(this);
    this.onPageComplete = this.onPageComplete.bind(this);
  }

  tabChange(tab) {
    this.setState({tab: tab, currUrl: '', pdfUrl: ''});
  }

  renderFile(file) {
    if(file.fileType === 'image/png' && this.state.currUrl === file.fileUrl) {
      this.setState({currUrl: ''});
    } else if(file.fileType === 'image/png') {
      this.setState({currUrl: file.fileUrl});
    } else if (file.fileType === 'application/pdf' && this.state.currUrl === file.fileUrl) {
      this.setState({pdfUrl: ''});
    } else if( file.fileType === 'application/pdf' ) {
      this.setState({pdfUrl: file.fileUrl});
    }
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
    console.log('this should be called at end', pages);
    this.setState({ page: 1, pages: pages });
  }

  onPageComplete(page) {
    console.log(page);
    this.setState({ page: page });
  }

  addTab() {
    this.setState({newTab: true});
  }

  editTab(i) {
    this.setState({editTab: i});
  }

  newName(name) {
    this.setState({currTabChange: name});
  }

  tabName() {
    if(this.state.currTabChange === '') {
      return;
    }
    this.setState({newTab: false});
    this.props.addTabs({data: this.state.currTabChange});
    this.setState({currTabChange: ''});
  }

  removeTab(i) {
    this.setState({newTab: false});
  }

  newTabName(name) {
    this.setState({saveTab: name});
  }

  tabNameChange(i) {
    if(this.state.saveTab) {
      this.props.changeTabName(this.state.saveTab, i);
    }
    this.setState({tab: this.state.saveTab, saveTab: '', editTab: -1});
  }

  removeTabBack(i) {
    this.props.removeTabName(i);
    this.setState({editTab: -1});
  }


  render() {
    return (
      <div className="row col-xs-12 portfolioBox">
        <h2>Portfolio</h2>
        <div className="tab-links">
          {this.props.tabs.map((tab, i) => {
            if(this.state.editTab === i && tab.name !== 'media' && tab.name !== 'documents' && tab.name !== 'code' && tab.name !== 'design') {
              return (
                <div key={i}>
                  <input placeholder={tab.name} onChange={(e) => this.newTabName(e.target.value)}/>
                  <button onClick={(e) => {e.preventDefault(); this.tabNameChange(i);}}>save</button>
                  <button onClick={(e) => {e.preventDefault(); this.removeTabBack(i);}}>remove</button>
                </div>
              );
            }
            return <p key={i} onClick={()=> (this.tabChange(tab.name))} onDoubleClick={() =>(this.editTab(i))}>{tab.name}</p>;
          })}
          {this.state.newTab ?
                <form>
                  <input placeholder="Change tab name" onChange={(e) => this.newName(e.target.value)}/>
                  <button onClick={(e) => {e.preventDefault(); this.tabName();}}>save</button>
                  <button onClick={(e) => {e.preventDefault(); this.removeTab();}}>remove</button>
                </form>
                : null
            }
          <p onClick={()=> (this.addTab())}>...</p>
        </div>

        {(this.state.currUrl !== '') ?
        <Lightbox
          mainSrc={this.state.currUrl}
          onCloseRequest={() => this.setState({ currUrl: '' })}
          toolbarButtons={[<a className="download" href={this.state.currUrl}>download</a>]}
          />
         :
          <p></p>}

          <Modal
            isOpen={(this.state.pdfUrl !== '') ? true : false}
            onRequestClose={() => this.closeModal()}
            contentLabel="Example Modal"
            >
            <button className="close-modal" onClick={() => this.closeModal()}>close</button>
            {(this.state.pdfUrl !== '') ?
            <PdfViewer
              file={this.state.pdfUrl}
              page={this.state.page}
              pages={this.state.pages}
              onDocumentComplete={this.onDocumentComplete}
              onPageComplete={this.onPageComplete}
              /> : <p></p>}
            <form>
              <input />
              <button onClick={(e) => {e.preventDefault(); this.handlePrevious();}}>Previous</button>
              <button onClick={(e) => {e.preventDefault(); this.handleNext();}}>Next</button>
            </form>
             <a className="download" href={this.state.pdfUrl}>download</a>
          </Modal>

        <Uploads
        tab={this.state.tab}
        renderFile={(file) => (this.renderFile(file))}/>
      </div>
    );
  }
}

PortfolioContainer.propTypes = {
  addTabs: PropTypes.func,
  tabs: PropTypes.array,
  changeTabName: PropTypes.func,
  removeTabName: PropTypes.func
};

const mapStateToProps = (state) => ({
  tabs: state.userReducer.portfolio
});

const mapDispatchToProps = (dispatch) => ({
  addTabs: (obj) => dispatch(addUserPortTabsThunk(obj)),
  changeTabName: (name, i) => updateUserPortTabsThunk(name, i)(dispatch),
  removeTabName: (i) => removeUserPortTabsThunk(i)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
