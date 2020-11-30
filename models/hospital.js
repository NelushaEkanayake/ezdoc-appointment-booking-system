var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//var clinic = require('./models/clinic');
//var ClinicSchema = require('./common');
//const { Clinicschema , ClinicModel } = require('./clinicd.js');


var Admin = new Schema({

    username: {
      type: String,
      default: '',
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      //validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },

     address: {
      type: String,
        default: ''
        
    },
    
 
    regno: {
      type: String,
        default: '',
        unique: true
    },
    
    hospitalname: {
      type: String,
        default: ''
    },
    
    

    admin:   {
        type: Boolean,
        default: false
    }

 }, {
    timestamps: true

    //clinic:[Clinicschema]

});

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', Admin);