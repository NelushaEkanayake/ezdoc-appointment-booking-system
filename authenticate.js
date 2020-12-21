var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Patient = require('./models/patient');
var Doctor = require('./models/doctor');
var Admin = require('./models/hospital');

var Jwtstrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//var clinic = require('./routes/clinic');

var cookieParser = require('cookie-parser');



var config = require('./config.js');

passport.use('patientLocal',new LocalStrategy(Patient.authenticate()));
passport.use('doctorLocal',new LocalStrategy(Doctor.authenticate()));
passport.use('adminLocal',new LocalStrategy(Admin.authenticate()));

passport.serializeUser(function(user, done) { 
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if(user!=null)
    done(null,user);
});
//passport.serializeUser(Patient.serializeUser());
//passport.deserializeUser(Patient.deserializeUser());




const maxAge = 3 * 24 * 60 * 60;
exports.maxAge = maxAge;
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: maxAge});
};


 var cookieExtractor = function(req) {
    var token = null;
   

    if (req && req.cookies) {
        token = req.cookies.jwt;
        console.log("success");
    }
    
    return token;

};
//module.exports = {cookieExtractor};
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.secretKey;

//ExtractJwt.fromAuthHeaderAsBearerToken();

exports.jwtPassport = passport.use('patient',new Jwtstrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        Patient.findOne({_id: jwt_payload._id}, (err, patient) => {
            if (err) {
                return done(err, false);
            }
            else if (patient) {
                return done(null, patient);
            }
            else {
                return done(null, false);
            }
        }); 
    }));

exports.verifyuser = passport.authenticate('patient', {session: false});



exports.jwtpassport = passport.use('doctor',new Jwtstrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        Doctor.findOne({_id: jwt_payload._id}, (err, doctor) => {
            if (err) {
                return done(err, false);
            }
            else if (doctor) {
                return done(null, doctor);
            }
            else {
                return done(null, false);
            }
        }); 
    }));

exports.verifyDoctor = passport.authenticate('doctor', {session: false});


exports.Jwtpassport = passport.use('admin',new Jwtstrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        Admin.findOne({_id: jwt_payload._id}, (err, admin) => {
            if (err) {
                return done(err, false);
            }
            else if (admin) {
                return done(null, admin);
            }
            else {
                return done(null, false);
            }
        }); 
    }));

exports.verifyAdmin = passport.authenticate('admin', {session: false});

