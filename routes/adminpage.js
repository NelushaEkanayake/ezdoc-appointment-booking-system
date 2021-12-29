var express = require('express');
var adrouter = express.Router();
var passport = require('passport');
var Clinics = require('../models/clinicd');

/* GET home page. */
adrouter.get('/:name',(req, res, next)=> {
  var name= req.params.name;
  var num =1;
  
  Clinics.find({hospital:name})
  .then((clinic) => {
    console.log(clinic);
    res.statusCode = 200;
    
    res.render('admin', { title: 'ezdoc', num:num,name:name,clinics: clinic.map((Clinics) => Clinics.toJSON()), });
}, (err) => next(err))
.catch((err) => next(err));
  
});

module.exports = adrouter;