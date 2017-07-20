import express from 'express';
const router = express.Router();
import {User, Tag, Post, Quote, Profile} from '../models/models';
import request from 'request';
import rp from 'request-promise';

// you have to import models like so:
// import TodoItem from '../models/TodoItem.js'
// getting all of tags and posts including comments
router.get('/user', (req, res) => {
  User.findById(req.user._id)
      .then((response) => {
        res.json({data: response});
      })
      .catch((err) => {
        res.json({data: null});
      });
});

// TODO use .then correctly without nesting
router.get('/get/discoverinfo', (req, res) => {
  let filters = [];
  let posts = [];
  Tag.find()
  .then((tags) => {
    filters = tags.map((tagObj) => {
      // ['general', 'technology'] for testing
      if (req.user.preferences.includes(tagObj.name)) {
        return {name: tagObj.name, checked: true};
      }
      return {name: tagObj.name, checked: false};
    });
    Post.find()
    .sort({createdAt: -1})
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
      console.log('here', filters, posts);
      res.json({filters: filters, posts: posts});
    })
    .catch((err) => {
      console.log('error 1', err);
      res.json(err);
    });
  })
  .catch((err) => {
    console.log('error 2', err);
    res.json({error: err});
  });
});

router.get('/get/profileinfo', (req, res) => {
  Profile.findOne({owner: req.user._id})
             .then((userProfile) => {
               const data = {
                 isCreated: userProfile.isCreated,
                 head: {
                   fullName: userProfile.fullName,
                   tags: userProfile.tags,
                   blurb: userProfile.blurb,
                   profileURL: userProfile.profileURL
                 },
                 info: {
                   about: {
                     education: userProfile.education,
                     majors: userProfile.majors,
                     currentOccupation: userProfile.currentOccupation,
                     pastOccupations: userProfile.pastOccupations
                   },
                   contact: {
                     email: userProfile.email,
                     address: userProfile.address,
                     phone: userProfile.phone
                   },
                   interests: userProfile.interests,
                   projects: userProfile.projects,
                   links: userProfile.links
                 },
                 main: {
                   portfolio: userProfile.portfolio,
                   story: userProfile.story
                 }
               };
               res.json({data: data});
             })
             .catch((err) => {
               console.log(err);
               res.json({data: null});
             });
});

// adding a new post
router.post('/save/post', (req, res) => {
  const newPost = new Post({
    content: req.body.postBody,
    createdAt: new Date(),
    createdBy: req.user._id,
    likes: [],
    tags: req.body.postTags,
    comments: [],
    commentNumber: 0,
  });
  newPost.save()
  .then(() => {
    console.log('success!');
    res.json({success: true});
  })
  .catch((e) => {
    console.log(e);
    res.json({success: false});
  });
});

// new comment
router.post('/save/comment', (req, res) => {
  Post.findById(req.body.postId)
      .then((response) => {
        const newComment = {
          content: req.body.commentBody,
          createdAt: new Date(),
          createdBy: req.user._id,
          likes: []
        };
        response.comments.push(newComment);
        response.save()
        .then((resp) => {
          res.json({success: true, data: response});
        });
      })
      .catch((err) => {
        res.json({success: false, data: null});
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

router.post('/save/postlike', (req, res) => {
  Post.findById(req.body.postId)
    .then((response) => {
      response.likes.push(req.user._id);
      response.save()
      .then((resp) => {
        res.json({success: true});
      });
    })
    .catch((err) => {
      res.json({success: false});
    });
});

router.post('/save/commentlike', (req, res) => {
  Post.findById(req.body.postId)
    .then((post) => {
      const comment = post.comments.filter((com) => {
        return com._id.toString() === req.body.commentId.toString();
      });
      comment[0].likes.push(req.user._id);
      return post.save();
    })
    .then(() => {
      res.json({success: true});
    })
    .catch((err) => {
      res.json({success: false});
    });
});

router.get('/get/quote', (req, res) => {
  Quote.find()
       .then((response) => {
         const ind = new Date().getDate() % response.length;
         res.json({quote: response[ind].content, createdby: response[ind].createdBy});
       })
       .catch(() => {
         res.json({quote: 'it’s kind of fun to do the impossible', createdBy: 'Walt Disney'});
       });
});

router.post('/save/blurb', (req, res) => {
  Profile.findOne({owner: req.user._id})
             .then((response) => {
               response.blurb = req.body.blurbBody;
               return response.save();
             })
             .then((resp) => {
               console.log(resp);
               res.json({success: true});
             })
             .catch((err) => {
               console.log(err);
               res.json({success: false});
             });
});

router.post('/save/tags', (req, res) => {
  Profile.findOne({owner: req.user._id}) // user req.user._id
             .then((response) => {
               response.tags = req.body.tagsArray;
               return response.save();
             })
             .then(() => {
               res.json({success: true});
             })
             .catch((err) => {
               console.log(err);
               res.json({success: false});
             });
});

router.post('/save/interests', (req, res) => {
  Profile.findOne({owner: req.user._id})
             .then((response) => {
               response.interests = req.body.interestsArray;
               return response.save();
             })
             .then(() => {
               res.json({success: true});
             })
             .catch((err) => {
               console.log(err);
               res.json({success: false});
             });
});

router.post('/save/about', (req, res) => {
  Profile.findOne({owner: req.body.id})
             .then((response) => {
               response.education = req.body.education;
               response.majors = req.body.majors;
               response.currentOccupation = req.body.currentOccupation;
               response.pastOccupations = req.body.pastOccupations;
               const addr = req.body.education.split(' ').join('+');
               const locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=' + process.env.LOCATION_API;
               request(locationUrl, function(error, resp, body) {
                 const jsonResp = JSON.parse(resp.body);
                 response.location = [jsonResp.results[0].geometry.location.lng,
                 jsonResp.results[0].geometry.location.lat];
                 response.save()
                 .then((data) => {
                   console.log(data);
                   res.json({success: true});
                 })
                 .catch((err) => {
                   console.log(err);
                   res.json({success: false});
                 });
               });
             })
             .catch((err) => {
               console.log(err);
               res.json({success: false});
             });
});

router.post('/save/contact', (req, res) => {
  Profile.findOne({owner: req.user._id})
             .then((response) => {
               response.email = req.body.email;
               response.address = req.body.address;
               response.phone = req.body.phone;
               response.location = req.body.location;
               const addr = req.body.address.split(' ').join('+');
               const locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=' + process.env.LOCATION_API;
               request(locationUrl, function(error, resp, body) {
                 const jsonResp = JSON.parse(resp.body);
                 response.location = [jsonResp.results[0].geometry.location.lng,
                 jsonResp.results[0].geometry.location.lat];
                 response.save()
                 .then((data) => {
                   console.log(data);
                   res.json({success: true});
                 })
                 .catch((err) => {
                   console.log(err);
                   res.json({success: false});
                 });
               });
             })
             .catch((err) => {
               console.log(err);
               res.json({success: false});
             });
});

router.post('/save/links', (req, res) => {
  Profile.findOne({owner: req.user._id})
             .then((response) => {
               response.links = req.body.linksArray;
               return response.save();
             })
             .then(() => {
               res.json({success: true});
             })
             .catch((err) => {
               console.log(err);
               res.json({success: false});
             });
});

router.post('/save/iscreated', (req, res) => {
  Profile.findOne({owner: req.user._id})
             .then((response) => {
               response.isCreated = true;
               return response.save();
             })
            .then((userProfile) => {
              const data = {
                isCreated: userProfile.isCreated,
                head: {
                  fullName: userProfile.fullName,
                  tags: userProfile.tags,
                  blurb: userProfile.blurb,
                  profileURL: userProfile.profileURL
                },
                info: {
                  about: {
                    education: userProfile.education,
                    majors: userProfile.majors,
                    currentOccupation: userProfile.currentOccupation,
                    pastOccupations: userProfile.pastOccupations
                  },
                  contact: {
                    email: userProfile.email,
                    address: userProfile.address,
                    phone: userProfile.phone
                  },
                  interests: userProfile.interests,
                  projects: userProfile.projects,
                  links: userProfile.links
                },
                main: {
                  portfolio: userProfile.portfolio,
                  story: userProfile.story
                }
              };
              console.log('in backend', data);
              res.json({data: data});
            })
            .catch((err) => {
              console.log(err);
              console.log('in error', err);
              res.json({data: null});
            });
});

module.exports = router;
