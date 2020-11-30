var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//var ClinicSchema = require('./common');

var Clinicschema = new Schema({

     clinicname: {
      type: String,
        default: ''
    },
 
    time: {
      type: String,
        default: ''
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Doctor'
    },
    

        hospital:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },

    doctor: {
      type: String,
        default: ''
    },
    

        hospital:  {
        type: String,
        default: ''
    }
  },{
    timestamps: true
  }

);

Clinicschema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Clinic', Clinicschema);

 

 //module.exports.ClinicModel = mongoose.model('Clinic', Clinicschema);


//module.exports = mongoose.model('Clinic', ClinicSchema);