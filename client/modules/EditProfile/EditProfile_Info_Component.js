import React from 'react';
import ContactContainer from './EditProfile_Info_Contact_Container';
import AboutContainer from './EditProfile_Info_About_Container';
import LinksContainer from './EditProfile_Info_Links_Container';
// import ProjectsContainer from './EditProfile_Info_Projects_Container';
import InterestsContainer from './EditProfile_Info_Interests_Container';

class Info extends React.Component {

  render() {
    return (
      <div>
        <h1>Info</h1>
        <AboutContainer />
        <ContactContainer />
        <LinksContainer />
        {/* <ProjectsContainer /> */}
        <InterestsContainer />
      </div>
    );
  }
}

export default Info;
