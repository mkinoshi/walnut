import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

export const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://walnut-1500128476052.firebaseio.com'
});
