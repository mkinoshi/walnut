import express from 'express';
const router = express.Router();
import {User, Tag, Post, Quote, Community} from '../models/models';
import axios from 'axios';
import Promise from 'promise';
// you have to import models like so:
// import TodoItem from '../models/TodoItem.js'
// getting all of tags and posts including comments
router.get('/user', (req, res) => {
  console.log('req.user', req.user);
  User.findById(req.user._id)
      .populate('communities')
      .populate('currentCommunity')
      .then((response) => {
        console.log('get user success response in middleware', response);
        res.json({data: response});
      })
      .catch((err) => {
        console.log('get user error', err);
        res.json({data: null});
      });
});

router.post('/create/community', (req, res) => {
  const community = new Community({
    title: req.body.title,
    users: [req.user._id],
    admins: [req.user._id],
    icon: req.body.image
  });
  return community.save()
    .then((response) => {
      User.findById(req.user._id)
            .then((user) => {
              console.log(user);
              user.communities.push(response._id);
              user.currentCommunity = response._id;
              return user.save();
            })
            .then((resp) => {
              console.log(resp);
              res.json({success: true, community: response});
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
      console.log('current 1', req.body.communityId);
      if (user.communities.indexOf(req.body.communityId) === -1) {
        user.communities.push(req.body.communityId);
      }
      user.currentCommunity = req.body.communityId;
      return user.save();
    })
    .then((response2) => {
      console.log(req.user.fullName + 'has successfully joined the community');
      res.json({success: true, community: joined});
    })
    .catch((err) => {
      console.log('join error', err);
      res.json({error: err});
    });
});

router.post('/toggle/community', (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      user.currentCommunity = req.body.communityId;
      return user.save();
    })
    .then((response) => {
      res.json({success: true});
    })
    .catch((err) => {
      res.json({error: err});
    });
});

router.get('/get/allcommunities', (req, res) => {
  Community.find()
      .then((communities) => {
        res.json({data: communities});
      })
      .catch((err) => {
        res.json({error: err});
      });
});

// TODO use .then correctly without nesting
router.get('/get/discoverinfo', (req, res) => {
  console.log('id', req.user.currentCommunity);
  Community.findById(req.user.currentCommunity)
      .populate('tags')
      .then((community) => {
        community.users.filter((user) => {
          return user === req.user._id;
        });
        if (community.length === 0) {
          console.log('not in community error');
          res.json({error: 'No authorization'});
        } else{
          const filters = community.tags;
          let posts = [];
          Post.find({community: req.user.currentCommunity})
            .limit(20)
            .sort({createdAt: -1})
            .populate('tags')
            .populate('comments')
            .populate('comments.createdBy')
            .populate('createdBy')
            .then((postArr) => {
              console.log('posts length', postArr.length);
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
              // console.log('here', filters, posts);
              res.json({filters: filters, posts: posts});
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

router.get('/get/next10', (req, res) => {
  console.log(req.query);
  Community.findById(req.user.currentCommunity)
        .populate('tags')
        .then((community) => {
          community.users.filter((user) => {
            return user === req.user._id;
          });
          if (community.length === 0) {
            console.log('not in community error');
            res.json({error: 'No authorization'});
          } else{
            const filters = community.tags;
            let posts = [];
            Post.find({community: req.user.currentCommunity})
                    .sort({createdAt: -1})
                    .skip(Number(req.query.lastOne))
                    .limit(20)
                    .populate('tags')
                    .populate('comments')
                    .populate('comments.createdBy')
                    .populate('createdBy')
                    .then((postArr) => {
                      console.log('next post', postArr);
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
                      res.json({filters: filters, posts: posts});
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

router.get('/get/profilecreate', (req, res) => {
  User.findById(req.user._id)
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
                currentOccupationCity: userProfile.currentOccupationCity,
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
    community: req.user.currentCommunity
  });
  newPost.save()
  .then(() => {
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
      if (response.likes.indexOf(req.user._id) > -1) {
        const idx = response.likes.indexOf(req.user._id);
        console.log('inside', idx);
        response.likes.splice(idx, 1);
      } else {
        console.log('outside', response.likes, req.user._id, response.likes.indexOf(req.user._id));
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
  Quote.find({community: req.user.currentCommunity})
       .then((response) => {
         const ind = new Date().getDate() % response.length;
         res.json({quote: response[ind].content, createdby: response[ind].createdBy});
       })
       .catch(() => {
         res.json({quote: 'it’s kind of fun to do the impossible', createdBy: 'Walt Disney'});
       });
});

router.post('/save/blurb', (req, res) => {
  User.fidnById(req.user._id)
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
  User.findById(req.user._id)
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
  User.findById(req.user._id)
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
  let globalResponse = {};
  User.findById(req.user._id)
         .then((response) => {
           globalResponse = response;
           globalResponse.education = req.body.education;
           globalResponse.currentOccupation = req.body.currentOccupation;
           globalResponse.currentOccupationCity = req.body.currentOccupationCity;
           globalResponse.pastOccupations = req.body.pastOccupations;
           if (req.body.education.college) {
             const addr = req.body.education.college.split(' ').join('+');
             const locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=' + process.env.LOCATION_API;
             return axios.get(locationUrl);
           }
           return null;
         })
         .then((resp) => {
           if (resp && req.body.currentOccupationCity) {
             const jsonResp = resp.data.results[0];
             globalResponse.location.college = [jsonResp.geometry.location.lng,
            jsonResp.geometry.location.lat];
             const occupationaddr = req.body.currentOccupationCity.split(' ').join('+');
             const locationOccupationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + occupationaddr + '&key=' + process.env.LOCATION_API;
             return axios.get(locationOccupationUrl);
           } else if (req.body.currentOccupationCity) {
             const occupationaddr = req.body.currentOccupationCity.split(' ').join('+');
             const locationOccupationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + occupationaddr + '&key=' + process.env.LOCATION_API;
             return axios.get(locationOccupationUrl);
           } else if (resp) {
             const jsonResp = resp.data.results[0];
             globalResponse.location.college = [jsonResp.geometry.location.lng,
            jsonResp.geometry.location.lat];
             return null;
           }
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
         .then((data) => {
           res.json({success: true});
         })
         .catch((err) => {
           console.log(err);
           res.json({success: false});
         });
});

router.post('/save/contact', (req, res) => {
  let globalResponse;
  User.findById(req.user._id)
            .then((response) => {
              globalResponse = response;
              globalResponse.email = req.body.email;
              globalResponse.address = req.body.address;
              globalResponse.phone = req.body.phone;
              globalResponse.location = req.body.location;
              if (response.address) {
                const addr = req.body.address.split(' ').join('+');
                const locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=' + process.env.LOCATION_API;
                return axios.get(locationUrl);
              }
              return null;
            })
             .then((resp) => {
               if (resp) {
                 const jsonResp = resp.data.results[0];
                 globalResponse.location.homeTown = [jsonResp.geometry.location.lng,
                jsonResp.geometry.location.lat];
               }
               return globalResponse.save();
             })
             .then((data) => {
               res.json({success: true});
             })
             .catch((err) => {
               console.log(err);
               res.json({success: false});
             });
});

router.post('/save/links', (req, res) => {
  User.findById(req.user._id)
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
  User.findById(req.user._id)
             .then((response) => {
               response.hasProfile = true;
               return response.save();
             })
            .then((userProfile) => {
              res.json({success: true, data: userProfile});
            })
            .catch((err) => {
              console.log('in created', err);
              res.json({data: null});
            });
});

router.get('/get/allusers', (req, res) => {
  Community.findById(req.user.currentCommunity)
      .populate('users')
      .then((community) => {
        res.json({data: community.users});
      })
      .catch((err) => {
        res.json({data: null});
      });
});

router.get('/get/allusersmap', (req, res) => {
  Community.findById(req.user.currentCommunity)
      .populate('users')
      .then((community) => {
        const users = community.users.map((user) => {
          return {
            id: user._id,
            fullName: user.fullName,
            pictureURL: user.pictureURL,
            location: user.location,
            career: user.currentOccupation,
            education: user.education
          };
        });
        console.log('got here');
        res.json({data: users});
      })
      .catch((err) => {
        res.json({data: null});
      });
});

router.get('/get/allusersdirectory', (req, res) => {
  Community.findById(req.user.currentCommunity)
      .populate('users')
      .then((community) => {
        res.json({data: community.users});
      })
      .catch((err) => {
        res.json({data: null});
      });
})

router.get('/get/specprofile', (req, res) => {
  User.findById(req.user._id)
         .then((userProfile) => {
           console.log(userProfile);
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
                 currentOccupationCity: userProfile.currentOccupationCity,
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

router.post('/update/location', (req, res) => {
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

router.get('/get/allusers', (req, res) => {
  User.find()
      .then((response) => {
        res.json({data: response});
      })
      .catch((err) => {
        res.json({data: null});
      });
});


router.post('/save/tag', (req, res) => {
  Tag.findOne({name: req.body.tag})
  .then((tag) => {
    if (tag) {
      tag.communities.push(req.user.currentCommunity);
      return tag.save();
    }
    const newTag = new Tag({
      communities: [req.user.currentCommunity],
      name: req.body.tag
    });
    return newTag.save();
  })
  .then((response) => {
    Community.findById(req.user.currentCommunity)
        .then((community) => {
          community.tags.push(response._id);
          return community.save();
        })
        .then((response2) => {
          console.log('saving tag success', response2);
          res.json({success: true});
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

router.post('/update/user', (req, res) => {
  console.log('req.body', req.body);
  User.findByIdAndUpdate(req.user._id, req.body.data)
      .then((response) => {
        res.json({success: true});
      })
      .catch((err) => {
        res.json({success: false});
      });
});

router.post('/update/portfoliotabs', (req, res) => {
  console.log('req.body', req.body);
  User.findById(req.user._id)
      .then((user) => {
        console.log(user);
        const obj = {
          data: [],
          name: req.body.data
        };
        user.portfolio.push(obj);
        return user.save();
      })
      .then((user) => {
        console.log('userobj after save', user);
        res.json({success: true});
      })
      .catch((err) => {
        res.json({success: false});
      });
});

router.post('/update/changeportfoliotabs', (req, res) => {
  console.log('req.body', req.body);
  User.findById(req.user._id)
      .then((user) => {
        user.portfolio[req.body.index].name = req.body.name;
        user.markModified('portfolio');
        return user.save();
      })
      .then((user) => {
        console.log('userobj after save', user);
        res.json({success: true});
      })
      .catch((err) => {
        res.json({success: false});
      });
});

router.post('/update/removeportfoliotabs', (req, res) => {
  console.log('req.body', req.body);
  User.findById(req.user._id)
      .then((user) => {
        user.portfolio.splice(req.body.index, 1);
        user.markModified('portfolio');
        return user.save();
      })
      .then((user) => {
        console.log('userobj after save', user);
        res.json({success: true});
      })
      .catch((err) => {
        res.json({success: false});
      });
});

module.exports = router;
