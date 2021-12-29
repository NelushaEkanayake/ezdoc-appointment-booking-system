var express = require('express');
const bodyParser = require('body-parser');
//var User = require('../models/user');
var Doctor = require('../models/doctor');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');


var passport = require('passport');

var authenticate = require('../authenticate');

var doctorRouter = express.Router();

doctorRouter.use(bodyParser.urlencoded({
    extended: true
}));
doctorRouter.use(bodyParser.json());




  

/* GET users listing. */
doctorRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



doctorRouter.post('/signup', (req, res, next) => {
  console.log("hi");

  
 
  Doctor.register(new Doctor({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.regno)
        user.regno = req.body.regno;

      if (req.body.city)
        user.city = req.body.city;

      if (req.body.specialty)
        user.specialty = req.body.specialty;
      
      if (req.body.doctorname)
        user.doctorname = req.body.doctorname;
    
       user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }

        
        passport.authenticate('doctorLocal')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });

      });
    }

    

  });




});



doctorRouter.post('/login', passport.authenticate('doctorLocal'), (req, res) => {
  /*var y = true;
  exports.y=y;*/
  var maxAge =authenticate.maxAge;
  var uid = req.user._id;
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  //res.setHeader('Content-Type', 'application/json');
  //res.json({success: true, token: token, status: 'You are successfully logged in!'});
  //res.render('DoctorPanel', { title: 'ezdoc' });
  res.cookie('jwt',token, {httpOnly:true, maxAge : maxAge * 1000});
  res.status(201).json({user : uid});
   //res.status(201).send({ code: 0, message: 'ok', data: token });
});



doctorRouter.get('/logout', (req, res) => {
  var y = true;
  exports.y=y;
  //const token = req.cookie.jwt;
  //console.log(token);
  try{
    res.cookie('jwt','', {maxAge: 1});
    res.redirect('/');
  }
  catch {
    var err = new Error('You are not logged in!');
    err.status = 403;
    
  }
});


module.exports = doctorRouter;
