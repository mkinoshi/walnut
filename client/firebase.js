import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAlvJ_fjJc3-4vzMkDfG4EQ81f02n8_0eE',
  authDomain: 'walnut-1500128476052.firebaseapp.com',
  databaseURL: 'https://walnut-1500128476052.firebaseio.com',
  projectId: 'walnut-1500128476052',
  storageBucket: 'walnut-1500128476052.appspot.com',
  messagingSenderId: '7094437893'
};

export const firebaseApp = firebase.initializeApp(config);
