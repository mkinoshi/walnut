import express from 'express';
const router = express.Router();
import {User, Tag, Post, Quote, Community} from '../../models/models';
import axios from 'axios';
import Promise from 'promise';
import firebaseApp from '../../../client/firebase';
import adminApp from '../../firebaseAdmin';

router.get('/user', (req, res) => {
  adminApp.auth().verifyIdToken(req.session.userToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      User.findOne({firebaseId: uid})
        .populate('communities')
        .populate('currentCommunity')
        .then((response) => {
          res.json({data: response});
        })
    }).catch((err) => {
      console.log('get user error', err);
      res.json({data: null});
    });
});

// TODO: this needs to be fixed. There is a "cannot read property map of undefined" error
router.post('/create/community', (req, res) => {
  adminApp.auth().verifyIdToken(req.session.userToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      const tagModels = req.body.defaultFilters.map((filter) =>
        new Tag({
          name: filter
        })
      );
      var userObj;
      User.findOne({firebaseId: uid})
      .then((user) => {
          userObj = user;
          return Promise.all(tagModels.map((tag) => tag.save()));
      })
      .then((values) => {
        // console.log('values', values);
        const community = new Community({
          title: req.body.title,
          users: [userObj._id],
          admins: [userObj._id],
          icon: req.body.image,
          defaultTags: values.map((val) => val._id),
          otherTags: []
        });
        return community.save();
      })
        .then((community) => {
          User.findById(userObj._id)
                .then((user) => {
                  user.communities.push(community._id);
                  user.currentCommunity = community._id;
                  return user.save();
                })
                .then((userSave) => {
                  Community.findById(community._id)
                      .populate('defaultTags')
                      .then((com) => {
                        var tags = [];
                        com.defaultTags.forEach((tag) => {
                          tag.owner = community._id;
                          tags.push(tag);
                        });
                        // console.log('tags', tags);
                        Promise.all(tags.map((tag) => tag.save()))
                        .then((values) => {
                          res.json({success: true, community: community});
                        });
                      });
                });
        })
    }).catch((err) => {
      console.log('got error', err);
      res.json({data: null});
    });
  
});

router.post('/join/community', (req, res) => {
  console.log('token', req.session.userToken);
  adminApp.auth().verifyIdToken(req.session.userToken)
    .then(function(decodedToken) {
      console.log('test', decodedToken);
      var uid = decodedToken.uid;
      let joined;
      let userId;
      User.findOne({firebaseId: uid})
      .then((userObj) => {
        console.log('hello');
        userId = userObj._id;
        return Community.findById(req.body.communityId);
      }).then((community) => {
          if (community.users.indexOf(userId) === -1) {
            community.users.push(userId);
          }
          joined = community;
          return community.save();
        })
        .then((response) => {
          return User.findById(userId);
        })
        .then((user) => {
          if (user.communities.indexOf(req.body.communityId) === -1) {
            user.communities.push(req.body.communityId);
          }
          user.currentCommunity = req.body.communityId;
          return user.save();
        })
        .then((savedUser) => {
          const opts = [
            { path: 'communities'},
            { path: 'currentCommunity'}
          ];
          return User.populate(savedUser, opts);
        })
        .then((populatedUser) => {
          console.log('got here');
          res.json({success: true, community: joined, user: populatedUser});
        })
    }).catch((err) => {
      console.log('join error', err);
      res.json({error: err});
    });
});

// router.post('/toggle/community', (req, res) => {
//   adminApp.auth().verifyIdToken(req.session.userToken)
//     .then(function(decodedToken) {
//       var uid = decodedToken.uid;
//       User.findOne({firebaseId: uid})
//       .then((user) => {
//         user.currentCommunity = req.body.communityId;
//         return user.save();
//       })
//       .then((response) => {
//         res.json({success: true});
//       })
//     }).catch((err) => {
//       console.log('got error', err);
//       res.json({data: null});
//     });
// });

router.post('/toggle/community', (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      user.currentCommunity = req.body.communityId;
      return user.save();
    })
    .then((savedUser) => {
      const opts = [
          { path: 'communities'},
          { path: 'currentCommunity'}
      ];
      return User.populate(savedUser, opts);
    })
    .then((populatedUser) => {
      res.json({success: true, data: populatedUser});
    })
    .catch((err) => {
      res.json({error: err});
    });
});

router.post('/toggle/checked', (req, res) => {
  adminApp.auth().verifyIdToken(req.session.userToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      User.findOne({firebaseId: uid})
      .then((userObj) => {
        if (userObj.preferences.includes(req.body.tagName)) {
          userObj.preferences.splice(userObj.preferences.indexOf(req.body.tagName), 1);
        } else {
          userObj.preferences.push(req.body.tagName);
        }
        userObj.save()
        .then((resp) => {
          res.json({success: true});
        });
      })
    }).catch((err) => {
      console.log('got error', err);
      res.json({data: null});
    });
});

module.exports = router;
