import express from 'express';
const router = express.Router();
import {User, Tag, Post, Quote, Community} from '../../models/models';
import axios from 'axios';
import Promise from 'promise';
import firebaseApp from '../../../client/firebase';
import adminApp from '../../firebaseAdmin';
import Metascraper from 'metascraper';

router.get('/app', (req, res) => {
  User.findById(req.user._id)
      .populate('communities')
      .populate({
        path: 'currentCommunity',
        populate: {path: 'admins defaultTags users'},
      })
      .then((response) => {
        Community.find()
          .then((communities) => {
            res.json({user: response, communities: communities});
          })
          .catch((err) => {
            res.json({error: err});
          });
      })
      .catch((err) => {
        console.log('get user error', err);
        res.json({data: null});
      });
});

router.get('/allcommunities', (req, res) => {
  console.log('hehehehehhe');
  Community.find()
      .then((communities) => {
        res.json({data: communities});
      })
      .catch((err) => {
        res.json({error: err});
      });
});

router.get('/discoverinfo', (req, res) => {
  Community.findById(req.user.currentCommunity)
        .populate('defaultTags')
        .populate('otherTags')
        .then((community) => {
          community.users.filter((user) => {
            return user === req.user._id;
          });
          if (community.length === 0) {
            res.json({ error: 'No authorization' });
          } else {
            const defaultFilters = community.defaultTags;
            const otherFilters = community.otherTags;
            let posts = [];
            // const filter = req.user.communityPreference.length > 0 ? { tags: { $in: req.user.communityPreference }, community: req.user.currentCommunity } : {community: req.user.currentCommunity};
            const filter = {community: req.user.currentCommunity};
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
                          username: postObj.createdBy.fullName,
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
                      res.json({ defaultFilters: defaultFilters, otherFilters: otherFilters, posts: posts, lastRefresh: new Date() });
                    })
                    .catch((err) => {
                      console.log('error 1', err);
                      res.json(err);
                    });
          }
        })
        .catch((err) => {
          console.log('error 2', err);
          res.json({ error: err });
        });
});

router.get('/discoverrefresh', (req, res) => {
  console.log('date comparison', new Date() > new Date(req.query.lastRefresh));
  const filters = JSON.parse(req.query.filters);
  let filter;
  let posts = [];
  if (filters.length > 0) {
    filter =  { tags: { $in: filters }, community: req.user.currentCommunity, createdAt: { $lte: new Date(req.query.lastRefresh) } };
  } else {
    filter = {community: req.user.currentCommunity, createdAt: { $lte: new Date(req.query.lastRefresh) }};
  }
  Post.find(filter)
    .sort({ createdAt: -1 })
    .populate('tags')
    .populate('comments')
    .populate('comments.createdBy')
    .populate('createdBy')
    .then((postArr) => {
      posts = postArr.map((postObj) => {
        return {
          postId: postObj._id,
          username: postObj.createdBy.fullName,
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
      res.json({ posts: posts, lastRefresh: new Date()});
    })
    .catch((err) => {
      console.log('error 1', err);
      res.json(err);
    });
});

router.get('/next10', (req, res) => {
  console.log(req.query.filters);
  const filters = JSON.parse(req.query.filters);
  Community.findById(req.user.currentCommunity)
        .populate('defaultTags')
        .populate('otherTags')
        .then((community) => {
          community.users.filter((user) => {
            return user === req.user._id;
          });
          if (community.length === 0) {
            res.json({error: 'No authorization'});
          } else{
            // const filters = community.tags;
            let filter;
            let posts = [];
            // const filter = req.user.communityPreference.length > 0 ? { tags: { $in: req.user.communityPreference }, community: req.user.currentCommunity, createdAt: { $lte: new Date(req.query.lastRefresh) } }
            //   : { community: req.user.currentCommunity, createdAt: { $lte: new Date(req.query.lastRefresh) } };
            if (filters.length > 0) {
              filter =  { tags: { $in: filters }, community: req.user.currentCommunity, createdAt: { $lte: new Date(req.query.lastRefresh) } };
            } else {
              filter = {community: req.user.currentCommunity, createdAt: { $lte: new Date(req.query.lastRefresh) }};
            }
            Post.find(filter)
                    .sort({createdAt: -1})
                    .skip(Number(req.query.lastOne))
                    .limit(20)
                    .populate('tags')
                    .populate('comments')
                    .populate('comments.createdBy')
                    .populate('createdBy')
                    .then((postArr) => {
                      posts = postArr.map((postObj) => {
                        if (!postObj.createdBy) {
                          console.log('found a fucking error');
                          console.log(postObj.createdBy);
                        }
                        return {
                          postId: postObj._id,
                          username: postObj.createdBy.fullName,
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
                      res.json({filters: filter, posts: posts});
                    })
                    .catch((err) => {
                      console.log('error 1', err);
                      res.json(err);
                    });
          }
        })
        .catch((err) => {
          console.log('error 2', err);
          res.json({error: err});
        });
});

router.get('/quote', (req, res) => {
  Quote.find({community: req.user.currentCommunity})
       .then((response) => {
         const ind = new Date().getDate() % response.length;
         res.json({quote: response[ind].content, createdby: response[ind].createdBy});
       })
       .catch(() => {
         res.json({quote: 'it’s kind of fun to do the impossible', createdBy: 'Walt Disney'});
       });
});

router.get('/allusers', (req, res) => {
  Community.findById(req.user.currentCommunity)
      .populate('users')
      .then((community) => {
        res.json({data: community.users, lastRefresh: new Date()});
      })
      .catch((err) => {
        res.json({data: null});
      });
});

router.get('/allusersmap', (req, res) => {
  Community.findById(req.user.currentCommunity)
      .populate('users')
      .then((community) => {
        const users = community.users.map((user) => {
          return {
            id: user._id,
            fullName: user.fullName,
            pictureURL: user.pictureURL,
            location: user.location,
            email: user.contact.email[0],
            career: user.currentOccupation,
            education: user.education
          };
        });
        res.json({data: users});
      })
      .catch((err) => {
        res.json({data: null});
      });
});

router.get('/allusersdirectory', (req, res) => {
  Community.findById(req.user.currentCommunity)
      .populate('users')
      .then((community) => {
        res.json({data: community.users});
      })
      .catch((err) => {
        res.json({data: null});
      });
});


router.post('/linkpreview', (req, res) => {
  Metascraper
    .scrapeUrl(req.body.url)
    .then((metadata) => {
      res.json({meta: metadata});
    });
});

router.get('/myconversations/:postIds', (req, res) => {
  const postIds = req.params.postIds.split('+');
  Post.find({ _id: { $in: postIds}})
  .populate('tags')
  .populate('createdBy')
  .then((postArr) => {
    const posts = postArr.map((postObj) => {
      return {
        postId: postObj._id,
        username: postObj.createdBy.fullName,
        pictureURL: postObj.createdBy.pictureURL,
        content: postObj.content,
        createdAt: postObj.createdAt,
        tags: postObj.tags,
        likes: postObj.likes,
        commentNumber: postObj.commentNumber,
        link: postObj.link,
        attachment: postObj.attachment,
        comments: postObj.comments
      };});
    res.json({posts: posts});
  });
});

module.exports = router;
