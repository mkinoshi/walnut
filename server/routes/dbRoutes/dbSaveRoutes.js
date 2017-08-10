import express from 'express';
const router = express.Router();
import {User, Tag, Post, Quote, Community} from '../../models/models';
import axios from 'axios';
import Promise from 'promise';
import firebaseApp from '../../../client/firebase';
import adminApp from '../../firebaseAdmin';

router.post('/post', (req, res) => {
  const newPost = new Post({
    content: req.body.postBody,
    createdAt: new Date(),
    createdBy: req.user._id,
    likes: [],
    tags: req.body.postTags,
    comments: [],
    commentNumber: 0,
    community: req.user.currentCommunity,
    link: '',
    attachments: {
      name: '',
      url: '',
      type: ''
    }
  });
  newPost.save()
    .then((r) => {
      // firebaseApp.database().ref('chats/' + r._id).set({
      //   title: r.content,
      //   createdAt: r.createdAt,
      // });
      // const start = {};
      // start[ ''/* firebaseId*/] = true;
      // firebaseApp.database().ref('members/' + r._id).set(start);
      let posts = [];
      const filter = req.user.communityPreference.length > 0 ? { tags: { $in: req.user.communityPreference }, community: req.user.currentCommunity, createdAt: { $gte: new Date(req.body.lastRefresh) } }
        : { community: req.user.currentCommunity, createdAt: { $gte: new Date(req.body.lastRefresh) } };
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
          res.json({ posts: posts, lastRefresh: new Date() });
        })
        .catch((err) => {
          console.log('error in new post not aws refresh', err);
          res.json(err);
        });
    }).catch((err) => {
      console.log('got error', err);
      res.json({data: null});
    });
});

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


router.post('/postlike', (req, res) => {
  Post.findById(req.body.postId)
    .then((response) => {
      if (response.likes.indexOf(req.user._id) > -1) {
        const idx = response.likes.indexOf(req.user._id);
        response.likes.splice(idx, 1);
      } else {
        response.likes.push(req.user._id);
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

router.post('/commentlike', (req, res) => {
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

router.post('/blurb', (req, res) => {
  User.findById(req.user._id)
         .then((response) => {
           response.blurb = req.body.blurbBody;
           response.isEdited = true;
           return response.save();
         })
         .then((user) => {
           res.json({success: true, user: user});
         })
         .catch((err) => {
           console.log(err);
           res.json({success: false});
         });
});

router.post('/tags', (req, res) => {
  User.findById(req.user._id)
         .then((response) => {
           response.tags = req.body.tagsArray;
           response.isEdited = true;
           return response.save();
         })
         .then((user) => {
           res.json({success: true, user: user});
         })
         .catch((err) => {
           console.log(err);
           res.json({success: false});
         });
});

router.post('/interests', (req, res) => {
  User.findById(req.user._id)
         .then((response) => {
           response.interests = req.body.interestsArray;
           response.isEdited = true;
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

router.post('/about', (req, res) => {
  let globalResponse = {};
  User.findById(req.user._id)
         .then((response) => {
           globalResponse = response;
           globalResponse.education.colleges = req.body.colleges;
           globalResponse.work = req.body.works;
           globalResponse.education.schools = req.body.schools;
           globalResponse.placesLived = req.body.placesLived;
           globalResponse.isEdited = true;
           if (req.body.colleges) {
             let addr;
             req.body.colleges.forEach((college) => {
               if (college.attendedFor === 'Undergraduate' && !addr) {
                 addr = college.name.split(' ').join('+');
               }
             });
             const locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=' + process.env.LOCATION_API;
             return axios.get(locationUrl);
           }
           return null;
         })
         .then((resp) => {
           if (resp) {
             const jsonResp = resp.data.results[0];
             globalResponse.location.college = [jsonResp.geometry.location.lng,
            jsonResp.geometry.location.lat];
           }
           req.body.works.forEach((work) => {
             if (work.isCurrent) {
               const workAddr = work.location.split(' ').join('+');
               const locationOccupationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + workAddr + '&key=' + process.env.LOCATION_API;
               return axios.get(locationOccupationUrl);
             }
           });
           return null;
         })
         .then((respond) => {
           if (respond) {
             const jsonp = respond.data.results[0];
             globalResponse.location.occupation = [jsonp.geometry.location.lng,
            jsonp.geometry.location.lat];
           }
           return globalResponse.save();
         })
         .then((user) => {
           res.json({success: true, user: user});
         })
         .catch((err) => {
           console.log(err);
           res.json({success: false});
         });
});

router.post('/contact', (req, res) => {
  let globalResponse;
  User.findById(req.user._id)
            .then((response) => {
              globalResponse = response;
              globalResponse.contact.email = req.body.email;
              globalResponse.contact.phones = req.body.phones;
              globalResponse.location = req.body.location;
              globalResponse.isEdited = true;
              return globalResponse.save();
            })
             .then((user) => {
               res.json({success: true, user: user});
             })
             .catch((err) => {
               console.log(err);
               res.json({success: false});
             });
});

router.post('/links', (req, res) => {
  User.findById(req.user._id)
         .then((response) => {
           response.links = req.body.linksArray;
           response.isEdited = true;
           return response.save();
         })
         .then((user) => {
           res.json({success: true, user: user});
         })
         .catch((err) => {
           console.log(err);
           res.json({success: false});
         });
});

router.post('/iscreated', (req, res) => {
  User.findById(req.user._id)
             .then((response) => {
               response.hasProfile = true;
               return response.save();
             })
            .then((userProfile) => {
              userProfile.populate('communities');
              res.json({success: true, data: userProfile});
            })
            .catch((err) => {
              console.log('in created', err);
              res.json({data: null});
            });
});

router.post('/tag', (req, res) => {
  const newTag = new Tag({
    owner: req.user.currentCommunity,
    name: req.body.tag
  });
  newTag.save()
  .then((response) => {
    Community.findById(req.user.currentCommunity)
        .then((community) => {
          if (req.body.isDefault) {
            community.defaultTags.push(response._id);
            return community.save();
          } else {
            community.otherTags.push(response._id);
            return community.save();
          }
        })
        .then((response2) => {
          res.json({success: true, tag: response});
        })
        .catch((err) => {
          console.log('error 1 saving tag', err);
          res.json({success: false});
        });
  })
  .catch((e) => {
    console.log('error saving tag', e);
    res.json({success: false});
  });
});

module.exports = router;
