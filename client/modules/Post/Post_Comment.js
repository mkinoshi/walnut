import React from 'react';
import PropTypes from 'prop-types';
import ModalContainer from './Post_Modal_Container';
import { Card, Icon, Image, Button, Modal, Header, Popup } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import css from './Post.css';
import firebaseApp from '../../firebase';

const dateStuff = {
  months: {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December'
  },
  days: {
    '01': '1st',
    '02': '2nd',
    '03': '3rd',
    '04': '4th',
    '05': '5th',
    '06': '6th',
    '07': '7th',
    '08': '8th',
    '09': '9th',
    '10': '10th',
    '11': '11th',
    '12': '12th',
    '13': '13th',
    '14': '14th',
    '15': '15th',
    '16': '16th',
    '17': '17th',
    '18': '18th',
    '19': '19th',
    '20': '20th',
    '21': '21st',
    '22': '22nd',
    '23': '23rd',
    '24': '24th',
    '25': '25th',
    '26': '26th',
    '27': '27th',
    '28': '28th',
    '29': '29th',
    '30': '30th',
    '31': '31st',
  }

};

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getUseDate(dateObj) {
    console.log('dateObj', dateObj);
    const now = new Date().toString().slice(4, 24).split(' ');
    const date = new Date(dateObj);
    const dateString = date.toString().slice(4, 24);
    const split = dateString.split(' ');
    console.log('split', split);
    const useMonth = dateStuff.months[split[0]];
    const useDay = dateStuff.days[split[1]];
    const timeArr = split[3].split(':');
    console.log('timeArr', timeArr);
    console.log('stuff', useMonth, useDay);
    let time;
    let hour;
    let isPM;
    if (parseInt(timeArr[0], 10) > 12) {
      hour = parseInt(timeArr[0], 10) - 12;
      isPM = true;
    }
    else {
      hour = parseInt(timeArr[0], 10);
    }
    const min = timeArr[1];
    if (isPM) {
      time = hour + ':' + min + 'PM';
    }
    else {
      time = hour + ':' + min + 'AM';
    }
    if (now[2] !== split[2]) {
      return useMonth + ' ' + useDay + ', ' + split[2] + ' ' + time;
    }
    return useMonth + ' ' + useDay + ', ' + time;
  }

  render() {
    const useDate = this.getUseDate(this.props.createdAt);
    if (this.props.authorId === firebaseApp.auth().currentUser.uid) {
      return (
        <Popup
        trigger={<div className="messageGroupYou">
          {/* <Image avatar className="message you" src={this.props.authorPhoto}/>*/}
          <div className="messageNameYou">{this.props.name}</div>
          <Card className="commentCardYou">
            <Card.Content >
              <Card.Description className="messageContent" style={{color: '#fff'}}>
                  {this.props.content}
              </Card.Description>
            </Card.Content>
          </Card>
        </div>}
        content={useDate}
        position='right center'
        inverted />
      );
    } else {
      return (
        <Popup
        trigger = {<div className="messageGroupOther">
          {/* <Image avatar className="message other" src={this.props.authorPhoto}/>*/}
          <div className="messageNameOther">{this.props.name}</div>
          <Card className="commentCardOther">
            <Card.Content>
              <Card.Description className="messageContent" style={{color: '#fff'}}>
                  {this.props.content}
              </Card.Description>
            </Card.Content>
          </Card>
        </div>}
        content={useDate}
        position='left center'
        inverted />
      );
    }
  }
}

Comment.propTypes = {
  postData: PropTypes.object,
  name: PropTypes.string,
  createdAt: PropTypes.string,
  content: PropTypes.string,
  currentUser: PropTypes.object,
  authorId: PropTypes.string,
  authorPhoto: PropTypes.string
};

export default Comment;
