var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var Doctor = require('./models/doctor');
var Admin = require('./models/hospital');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens



var config = require('./config.js');

passport.use('userLocal',new LocalStrategy(User.authenticate()));
passport.use('doctorLocal',new LocalStrategy(Doctor.authenticate()));
passport.use('adminLocal',new LocalStrategy(Admin.authenticate()));

passport.serializeUser(function(user, done) { 
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if(user!=null)
    done(null,user);
});




const maxAge = 3 * 24 * 60 * 60;
exports.maxAge = maxAge;
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: maxAge});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});