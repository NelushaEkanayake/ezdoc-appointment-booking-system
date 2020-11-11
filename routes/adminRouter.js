var express = require('express');
const bodyParser = require('body-parser');
//var User = require('../models/user');
var Admin = require('../models/hospital');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');


var passport = require('passport');

var authenticate = require('../authenticate');

var adminRouter = express.Router();

adminRouter.use(bodyParser.urlencoded({
    extended: true
}));
adminRouter.use(bodyParser.json());




/* GET users listing. */
adminRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



adminRouter.post('/signup', (req, res, next) => {
  console.log("hi");

  
 
  Admin.register(new Admin({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.regno)
        user.regno = req.body.regno;
      
      if (req.body.hospitalname)
        user.hospitalname = req.body.hospitalname;

      if (req.body.address)
        user.address = req.body.address;
    
       user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }

        
        passport.authenticate('adminLocal')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });

      });
    }

    

  });




});



adminRouter.post('/login', passport.authenticate('adminLocal'), (req, res) => {

  
 
  var maxAge =authenticate.maxAge;
  var uid = req.user._id;
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  //res.setHeader('Content-Type', 'application/json');
  //res.json({success: true, token: token, status: 'You are successfully logged in!'});
  res.cookie('jwt',token, {httpOnly:true, maxAge : maxAge * 1000});
  res.status(201).json({user : uid});
   //res.status(201).send({ code: 0, message: 'ok', data: token });
});



adminRouter.get('/logout', (req, res) => {

  var z = true;
  exports.z=z;
 
  
  try{
    res.cookie('jwt','', {maxAge: 1});
    res.redirect('/');
  }
  catch {
    var err = new Error('You are not logged in!');
    err.status = 403;
    
  }
});


module.exports = adminRouter;
