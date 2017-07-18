
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import Main from '../components/main/Main';
import Info from '../components/info/Info';

const dummyData = {

};

class ProfileContainer extends React.Component {

  render() {
    console.log('ran before front');
    return (
      <div>
        <p>profile</p>
        <Head />
        <Main />
        <Info />
      </div>
    );
  }
}

ProfileContainer.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);




fname: {
  type: String
},
lname: {
  type: String
},
facebookId: {
  type: String
},
email: {
  type: String
},
password: {
  type: String
},
pictureURL: {
  type: String
},
Project: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
],
preferences: [
  {
    type: String
  }
],
isCreated: {
  type: false
},
tags: {
  type: Array
},
blurb: {
  type: String
},
name: {
  type: String
},
email: {
  type: String
},
location: {
  type: String
},
phone: {
  type: String
},
currentOccupation: {
  type: String
},
pastOccupations: {
  type: Array
},
links: {
  type: Object
},
interests: {
  type: Object
},
portfolio: {
  type: Object
}
