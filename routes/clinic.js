const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
var authenticate = require('../authenticate');


var Doctor = require('../models/doctor');
var Clinics = require('../models/clinicd');
var cookieParser = require('cookie-parser');
//const {cookieExtractor} = require('../authenticate');

const clinicRouter = express.Router();

//dishRouter.use(bodyParser.json());
clinicRouter.use(bodyParser.urlencoded({
    extended: true
}));
clinicRouter.use(bodyParser.json());


//var cookieExtractor =authenticate.cookieExtractor;
clinicRouter.route('/clinics')






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
.get(authenticate.verifyDoctor,(req,res,next) => {
    Clinics.find({doctor:req.user._id})
    //.populate('comments.author')
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})


.post(authenticate.verifyDoctor,(req, res, next) => {
    req.body.doctor = req.user._id;
    Clinics.create(req.body)

    .then((clinic) => {
        console.log('clinic Created ', clinic);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(clinic);
    }, (err) => next(err))
    .catch((err) => next(err));
});






module.exports = clinicRouter;