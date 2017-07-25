import React from 'react';
import PropTypes from 'prop-types';
import Uploads from './EditProfile_Main_Body_Portfolio_Uploads_Container';
import Lightbox from 'react-image-lightbox';
import PdfViewer from './EditProfile_Main_Body_Portfolio_Uploads_PDF.js';
import Modal from 'react-modal';
import css from './EditProfile.css';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'media',
      currUrl: '',
      pdfUrl: '',
      page: 1,
      pages: 100,
      tabs: [],
      editTab: false,
      currTabChange: '',
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
    this.setState({tabs: this.state.tabs.concat(['Change Name']), editTab: true});
  }

  editTab() {
    this.setState({editTab: true});
  }

  tabName(i) {
    const tabsC = this.state.tabs;
    tabsC[i] = this.state.currTabChange;
    this.setState({tabs: tabsC, editTab: false});
  }

  removeTab(i) {
    const tabsC = this.state.tabs;
    tabsC.splice(i, 1);
    this.setState({tabs: tabsC});
  }

  newName(name) {
    this.setState({currTabChange: name});
  }


  render() {
    return (
      <div className="row col-xs-12 portfolioBox">
        <h2>Portfolio</h2>
        <div className="tab-links">
          <p onClick={()=> (this.tabChange('media'))}>Media</p>
          <p onClick={()=> (this.tabChange('documents'))}>Documents</p>
          <p onClick={()=> (this.tabChange('code'))}>Code</p>
          <p onClick={()=> (this.tabChange('design'))}>Design</p>
          {this.state.tabs.map((tab, i) => {
            if(this.state.editTab) {
              return (
                <form key={i}>
                  <input placeholder={tab} onChange={(e) => this.newName(e.target.value)}/>
                  <button onClick={(e) => {e.preventDefault(); this.tabName(i);}}>save</button>
                  <button onClick={(e) => {e.preventDefault(); this.removeTab(i);}}>remove</button>
                </form>
              );
            }
            return (
              <p key={i} onClick={()=> (this.tabChange(tab))}
              onDoubleClick={() =>(this.editTab())}>{tab}</p>
            );
          })}
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

Portfolio.propTypes = {
};

export default Portfolio;
