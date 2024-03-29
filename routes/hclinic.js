const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
var authenticate = require('../authenticate');
var Doctor = require('../models/doctor');
const nodemailer = require("nodemailer");
var Admin = require('../models/hospital');
var Clinics = require('../models/clinicd');
var cookieParser = require('cookie-parser');
//const {cookieExtractor} = require('../authenticate');

const hclinicRouter = express.Router();

//dishRouter.use(bodyParser.json());
hclinicRouter.use(bodyParser.urlencoded({
    extended: true
}));
hclinicRouter.use(bodyParser.json());


//var cookieExtractor =authenticate.cookieExtractor;
hclinicRouter.route('/clinics')






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
.get(authenticate.verifyAdmin,(req,res,next) => {
    Clinics.find({hospital:req.user._id})
    //.populate('comments.author')
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(authenticate.verifyAdmin,(req, res, next) => {
    req.body.hospital = req.user.hospitalname;
    Doctor.findById(req.body.doctorid)
    .then((doc) => {
        console.log(doc);
        req.body.clinicname = doc.specialty;
        req.body.doctor = doc.doctorname;
        req.body.state = 'PENDING';
        Clinics.create(req.body)
        .then((clinic) => {
            let clin = clinic._id;
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "nelushapcm@gmail.com",
                  pass: "Apegama#96$",
                },
              });
              let mailOption = {
                from: "nelushapcm@gmail.com",
                to: doc.username,
                subject: "Scheduling a New Clinic",
                text: "Your appointment was success",
                html: ' <p>To Confirm the Scheduled clinic </p><a href="http://localhost:3000/acceptclinic/' + clin  +'"> click here</a>',
              };
              transporter.sendMail(mailOption, function (err, data) {
                if (err) {
                  console.log("error occure", err);
                } else {
                  console.log("email sent!!");
                }
              });
        
            console.log('clinic Created ', clinic);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(clinic);
        }, (err) => next(err))
        .catch((err) => next(err));
        
    }, (err) => next(err))
    .catch((err) => next(err));
   

    
});





module.exports = hclinicRouter;