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
                  const pref = {
                    community: `${community._id}`,
                    pref: []
                  };
                  user.preferences.push(pref);
                  user.markModified('preferences');
                  return user.save();
                })
                .then((userSave) => {
                  console.log('dhhdhdhd', userSave);
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
          console.log('comm id', req.body.communityId);
          const commPref = user.preferences.filter((pref) => pref.community === req.body.communityId);
          if (commPref.length === 0 || commPref[0].pref.length === 0) {
            const pref = {
              community: req.body.communityId,
              pref: []
            };
            user.preferences.push(pref);
          }
          user.markModified('preferences', 'currentCommunity');
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
  console.log(req.body);
  User.findById(req.user._id)
        .then((user) => {
          console.log('user', user);
          user.currentCommunity = req.body.communityId;
          const tmp = user.preferences.filter((pref) =>
                (pref.community === req.body.communityId));
          console.log(tmp);
          user.communityPreference = tmp[0].pref;
          user.markModified('currentCommunity');
          user.markModified('communityPreference');
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
          console.log('errororororororororororororor', err);
          res.json({error: err});
        });
});

router.post('/toggle/checked', (req, res) => {
  User.findById(req.user._id)
        .then((response) => {
          if (req.user.communityPreference.includes(req.body.tagId)) {
            response.preferences.filter((pref) => (pref.community.toString() === req.user.currentCommunity.toString()))[0].pref.splice(req.user.preferences.filter((pref) => (pref.community.toString() === req.user.currentCommunity.toString()))[0].pref.indexOf(req.body.tagId), 1);
          } else {
            response.preferences.filter((pref) => (pref.community.toString() === req.user.currentCommunity.toString()))[0].pref.push(req.body.tagId);
          }
          response.communityPreference = response.preferences.filter((pref) => (pref.community.toString() === req.user.currentCommunity.toString()))[0].pref;
          response.markModified('communityPreference');
          response.markModified('preferences');
          response.save()
                .then((savedUser) => {
                  const opts = [
                        { path: 'currentCommunity' }
                  ];
                  return User.populate(savedUser, opts);
                })
                .then((user) => {
                  let posts = [];
                  console.log('user obj', user.communityPreference);
                  const filter = user.communityPreference.length > 0 ? { tags: { $in: user.communityPreference }, community: user.currentCommunity } : { community: user.currentCommunity };
                  Post.find(filter)
                        .limit(10)
                        .sort({ createdAt: -1 })
                        .populate('tags')
                        .populate('comments')
                        .populate('comments.createdBy')
                        .populate('createdBy')
                        .then((postArr) => {
                          posts = postArr.map((postObj) => {
                            return {
                              postId: postObj._id,
                              username: postObj.createdBy.username,
                              pictureURL: postObj.createdBy.pictureURL,
                              content: postObj.content,
                              createdAt: postObj.createdAt,
                              tags: postObj.tags,
                              likes: postObj.likes,
                              commentNumber: postObj.commentNumber,
                              link: postObj.link,
                              attachment: postObj.attachment,
                              comments: postObj.comments.map((commentObj) => {
                                return {
                                  commentId: commentObj._id,
                                  username: commentObj.createdBy.username,
                                  pictureURL: commentObj.createdBy.pictureURL,
                                  content: commentObj.content,
                                  createdAt: commentObj.createdAt,
                                  likes: commentObj.likes
                                };
                              })
                            };
                          });
                          res.json({posts: posts, user: user });
                        })
                        .catch((err) => {
                          console.log('error 1', err);
                          res.json({ success: false });
                        });
                });
        })
        .catch((err) => {
          console.log('error 1', err);
          res.json({success: false});
        });
});

router.post('/toggle/checkedtemp', (req, res) => {
  let posts = [];
  console.log(req.body.useFilters, req.user.communityPreference.concat(req.body.useFilters));
  const filter =  { tags: { $in: req.user.communityPreference.concat(req.body.useFilters) }, community: req.user.currentCommunity };
  Post.find(filter)
        .limit(10)
        .sort({ createdAt: -1 })
        .populate('tags')
        .populate('comments')
        .populate('comments.createdBy')
        .populate('createdBy')
        .then((postArr) => {
          posts = postArr.map((postObj) => {
            return {
              postId: postObj._id,
              username: postObj.createdBy.username,
              pictureURL: postObj.createdBy.pictureURL,
              content: postObj.content,
              createdAt: postObj.createdAt,
              tags: postObj.tags,
              likes: postObj.likes,
              commentNumber: postObj.commentNumber,
              link: postObj.link,
              attachment: postObj.attachment,
              comments: postObj.comments.map((commentObj) => {
                return {
                  commentId: commentObj._id,
                  username: commentObj.createdBy.username,
                  pictureURL: commentObj.createdBy.pictureURL,
                  content: commentObj.content,
                  createdAt: commentObj.createdAt,
                  likes: commentObj.likes
                };
              })
            };
          });
          res.json({ posts: posts});
        })
        .catch((err) => {
          console.log('error 1', err);
          res.json({ success: false });
        });
});

module.exports = router;
