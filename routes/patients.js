var express = require('express');
const bodyParser = require('body-parser');
var Patient = require('../models/patient');
//var Doctor = require('../models/doctor');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var passport = require('passport');

var authenticate = require('../authenticate');

var patientRouter = express.Router();

patientRouter.use(bodyParser.urlencoded({
    extended: true
}));
patientRouter.use(bodyParser.json());





 


/* GET users listing. */
patientRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



patientRouter.post('/signup', (req, res, next) => {
  console.log("hi");

  
 
  Patient.register(new Patient({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
     
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      if (req.body.NIC)
        user.NIC = req.body.NIC;
      if (req.body.FirstName)
        user.FirstName = req.body.FirstName;
      if (req.body.address)
        user.address = req.body.address;
      if (req.body.regno)
        user.regno = req.body.regno;
      if (req.body.admin)
        user.admin = req.body.admin;
      if (req.body.doctor)
        user.doctor = req.body.doctor;
      if (req.body.patiant)
        user.patiant = req.body.patiant;
      if (req.body.doctorname)
        user.doctorname = req.body.doctorname;
    
       user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }

        
        passport.authenticate('patientLocal')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });

      });
    }

    

  });




});



patientRouter.post('/login', passport.authenticate(['patientLocal','doctorLocal','adminLocal']), (req, res) => {
 
  
  var maxAge =authenticate.maxAge;
  var uid = req.user._id;
  if(req.user.FirstName){
    var name = req.user.FirstName;

    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    //res.setHeader('Content-Type', 'application/json');
    //res.json({success: true, token: token, status: 'You are successfully logged in!'});
    res.cookie('jwt',token, {httpOnly:true, maxAge : maxAge * 1000});
    res.status(201).json({user : uid , name : name});
  }

  if(req.user.hospitalname){
    var hospital = req.user.hospitalname;

    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    //res.setHeader('Content-Type', 'application/json');
    //res.json({success: true, token: token, status: 'You are successfully logged in!'});
    res.cookie('jwt',token, {httpOnly:true, maxAge : maxAge * 1000});
    res.status(201).json({user : uid , hospital : hospital});
  }

  if(req.user.doctorname){
    var doctor = req.user.doctorname;

    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    //res.setHeader('Content-Type', 'application/json');
    //res.json({success: true, token: token, status: 'You are successfully logged in!'});
    res.cookie('jwt',token, {httpOnly:true, maxAge : maxAge * 1000});
    res.status(201).json({user : uid , doctor : doctor});
  }
  
 
   //res.status(201).send({ code: 0, message: 'ok', data: token });
});



patientRouter.get('/logout', (req, res) => {
  var x = true;
  exports.x=x;
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


module.exports = patientRouter;
