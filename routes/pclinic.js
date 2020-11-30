const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
var authenticate = require('../authenticate');


var Admin = require('../models/hospital');
var Clinics = require('../models/clinicd');
var cookieParser = require('cookie-parser');
//const {cookieExtractor} = require('../authenticate');

const pclinicRouter = express.Router();

//dishRouter.use(bodyParser.json());
pclinicRouter.use(bodyParser.urlencoded({
    extended: true
}));
pclinicRouter.use(bodyParser.json());


//var cookieExtractor =authenticate.cookieExtractor;
pclinicRouter.route('/clinics')






/*.post((req, res, next) => {
    Doctor.findById(req.params.doctorId)
    .then((doctor) => {
        if (doctor != null) {
            req.body.doctor = req.user._id;
            doctor.clinics.push(req.body);
            doctor.save()
            .then((doctor) => {
                Doctor.findById(doctor._id)
                .populate('clinics.doctor')
                .then((doctor) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(doctor);
                })            
                               
            }, (err) => next(err));
        }
        else {
            err = new Error('Doctor ' + req.params.doctorId + ' not found');
            err.status = 404;
             return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});
*/


.get((req,res,next) => {
    Clinics.find({})
    //.populate('comments.author')
    .then((clinics) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(clinics);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = pclinicRouter;