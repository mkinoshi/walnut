import express from 'express';
const router = express.Router();
import {User, Tag, Post, Quote, Community} from '../../models/models';
import axios from 'axios';
import Promise from 'promise';
import firebaseApp from '../../../client/firebase';
var adminApp = require('../../firebaseAdmin');

router.post('/location', (req, res) => {
  User.findById(req.user._id)
      .then((response) => {
        response.location.live = req.body.location;
        return response.save();
      })
      .then((resp) => {
        res.json({success: true});
      })
      .catch((err) => {
        res.json({success: false});
      });
});

router.post('/user', (req, res) => {
  adminApp.adminApp.auth().verifyIdToken(req.session.userToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      User.findOneAndUpdate({firebaseId: uid}, req.body.data)
        .populate('currentCommunity')
        .populate('communities')
        .then((response) => {
          res.json({success: true, data: response});
        })
    }).catch((err) => {
      console.log('update user error', err);
      res.json({data: null});
    });
});

router.post('/portfoliotabs', (req, res) => {
  User.findById(req.user._id)
      .then((user) => {
        const obj = {
          data: [],
          name: req.body.data
        };
        user.portfolio.push(obj);
        return user.save();
      })
      .then((user) => {
        res.json({success: true});
      })
      .catch((err) => {
        res.json({success: false});
      });
});

router.post('/changeportfoliotabs', (req, res) => {
  User.findById(req.user._id)
      .then((user) => {
        user.portfolio[req.body.index].name = req.body.name;
        user.markModified('portfolio');
        return user.save();
      })
      .then((user) => {
        res.json({success: true});
      })
      .catch((err) => {
        res.json({success: false});
      });
});

router.post('/removeportfoliotabs', (req, res) => {
  User.findById(req.user._id)
      .then((user) => {
        let index = - 1;
        for(let i = 0; i < user.portfolio.length; i += 1) {
          if(user.portfolio[i].name === req.body.tab) {
            index = i;
          }
        }
        if(index > - 1) {
          user.portfolio[index].data.splice(req.body.index, 1);
          user.markModified('portfolio');
          return user.save();
        }
        return null;
      })
      .then((user) => {
        res.json({success: true});
      })
      .catch((err) => {
        res.json({success: false});
      });
});


module.exports = router;
