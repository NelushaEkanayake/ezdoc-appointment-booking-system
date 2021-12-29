const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const nodemailer = require('nodemailer');


var Admin = require('../models/hospital');
var Clinics = require('../models/clinicd');
var cookieParser = require('cookie-parser');
const QRCode = require('qrcode');
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


/*.get((req,res,next) => {
    Clinics.find({})
    //.populate('comments.author')
    .then((clinics) => {
       
        //res.setHeader('Content-Type', 'application/json');
         console.log(clinics);
         res.statusCode = 200;
         res.render('channel',{time:clinics.time});
        //res.redirect('/channelpage');
        //res.json(clinics);
    }, (err) => next(err))
    .catch((err) => next(err));
});*/


/*.get((req,res,next) => {
    var resultArray = [];
    var time;
    var clinic;
    Clinics.find({}, function(err, data){
       if (err) throw err
            data.forEach(function(err,doc){
                
                resultArray.push(doc);
               // console.log(resultArray[x].time);

            })
            res.render('channel',{items:resultArray});
    })
    //.populate('comments.author')
    
});*/

.get( (req, res) => {
    Clinics.find((err, docs) => {
        if (!err) {
            //console.log(typeof(docs));
            //console.log(docs[1]);
            //console.log(docs[1].clinicname);
            //var x = docs[1].clinicname;
            //console.log(x);
            //res.json({list:docs});
            res.render("channel", {
                list: docs.map(Clinics => Clinics.toJSON())

            });
            typeof(list);

        }
        else {
            console.log('Error in retrieving doctor list :' + err);
        }

         
    });
});


pclinicRouter.route('/clinics/:id')


.post(authenticate.verifyuser,(req, res, next) => {
    const id = req.params.id;
    console.log(id);
    Clinics.findById(id)
    .then((clinic) => {
        if (clinic != null) {
            var le = clinic.appointments.length+1;
            req.body.author = req.user._id;
            req.body.number = le;
        
            clinic.appointments.push(req.body);

            clinic.save()
            .then((clinic) => {
                

                Clinics.findById(clinic._id)
                .populate('appointments.author')
                .then((clinic) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(clinic);
                })            
                               
            }, (err) => next(err));

            let data = {
                PatientName:req.user.username,
                PatientName:req.user._id,
                AppointmentNum:le,
                Doctor:clinic.doctor,
                time:clinic.time,
                place:clinic.hospital,
                
            }

            let stringdata = JSON.stringify(data)

            // Converting the data into base64
QRCode.toDataURL(stringdata, function (err, code) {
    if(err) return console.log("error occurred")
 
    let transporter = nodemailer.createTransport({

        service:'gmail',
        auth:{
            user:'nelushapcm@gmail.com',
            pass:'Apegama#96$'
        }
    });

    console.log(req.user.username);
    
    
    let mailOption = {
        from:'nelushapcm@gmail.com',
        to:req.user.username,
        subject:'Ezdoc new Appointment',
        text:'Your appointment was success',
        html: '<b>Your appointment was success</b></br>',
        attachments: [
            {   // encoded string as an attachment
              filename: 'code.jpg',
              content: code.split("base64,")[1],
              encoding: 'base64'
            }
          ]
        

        
        
    };
    
    transporter.sendMail(mailOption, function(err, data){
        if(err){
            console.log('error occure',err);
        } else{
            console.log('email sent!!');
        }
    });
})
            

         

        }
        else {
            err = new Error('clinic ' + req.params.id + ' not found');
            err.status = 404;
             return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = pclinicRouter;