var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;

//logs out if cookie session is gone
router.use(function(req, res, next){
  if(!req.user){
    res.redirect('/login')
  }else{
    next();
  }
})
