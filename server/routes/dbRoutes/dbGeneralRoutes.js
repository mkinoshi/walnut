import express from 'express';
const router = express.Router();
import {User, Tag, Post, Quote, Community} from '../../models/models';
import axios from 'axios';
import Promise from 'promise';
import firebaseApp from '../../../client/firebase';
import adminApp from '../../firebaseAdmin';

router.get('/user', (req, res) => {
  User.findById(req.user._id)
      .populate('communities')
      .populate('currentCommunity')
      .then((response) => {
        res.json({data: response});
      })
      .catch((err) => {
        console.log('get user error', err);
        res.json({data: null});
      });
});

// TODO: this needs to be fixed. There is a "cannot read property map of undefined" error
router.post('/create/community', (req, res) => {
  const tagModels = req.body.defaultFilters.map((filter) =>
      new Tag({
        name: filter
      })
  );
  Promise.all(tagModels.map((tag) => tag.save()))
  .then((values) => {
    const community = new Community({
      title: req.body.title,
      users: [req.user._id],
      admins: [req.user._id],
      icon: req.body.image,
      defaultTags: values.map((val) => val._id),
      otherTags: []
    });
    return community.save();
  })
    .then((community) => {
      User.findById(req.user._id)
            .then((user) => {
              user.communities.push(community._id);
              user.currentCommunity = community._id;
              return user.save();
            })
            .then((userSave) => {
              Community.findById(community._id)
                  .populate('defaultTags')
                  .then((com) => {
                    com.queries.push(userSave.queries);
                    const tags = [];
                    com.defaultTags.forEach((tag) => {
                      tag.owner = community._id;
                      tags.push(tag);
                    });
                    Promise.all(tags.map((tag) => tag.save()))
                    .then((values) => {
                      res.json({success: true, community: community});
                    });
                  });
            });
    })
    .catch((err) => {
      console.log('got error', err);
      res.json({error: err});
    });
});

router.post('/join/community', (req, res) => {
  let joined;
  Community.findById(req.body.communityId)
    .then((community) => {
      if (community.users.indexOf(req.user._id) === -1) {
        community.users.push(req.user._id);
      }
      joined = community;
      return community.save();
    })
    .then((response) => {
      return User.findById(req.user._id);
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
      res.json({success: true, community: joined, user: populatedUser});
    })
    .catch((err) => {
      console.log('join error', err);
      res.json({error: err});
    });
});

router.post('/toggle/community', (req, res) => {
  console.log('toggeling right now');
  console.log(req.body);
  User.findById(req.user._id)
    .then((user) => {
      user.currentCommunity = req.body.data;
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
      console.log('returning user');
      console.log(populatedUser);
      res.json({success: true, data: populatedUser});
    })
    .catch((err) => {
      res.json({error: err});
    });
});

router.post('/toggle/checked', (req, res) => {
  User.findById(req.user._id)
      .then((response) => {
        if (req.user.preferences.includes(req.body.tagName)) {
          response.preferences.splice(req.user.preferences.indexOf(req.body.tagName), 1);
        } else {
          response.preferences.push(req.body.tagName);
        }
        response.save()
        .then((resp) => {
          res.json({success: true});
        });
      })
      .catch((err) => {
        res.json({success: false});
      });
});

module.exports = router;
