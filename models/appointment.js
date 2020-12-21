var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
//var ClinicSchema = require('./common');

var appointmentschema = new mongoose.Schema({

     appointmentname: {
      type: mongoose.Schema.Types.ObjectId,
        default: 'Clinic'
    },
 
    time: {
      type: mongoose.Schema.Types.ObjectId,
        default: 'Clinic'
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Clinic'
    },
    

        hospital:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic'
    },

    patientname: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }

   
  },{
    timestamps: true
  }

);

//Clinicschema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Appointment', appointmentschema);

 

 //module.exports.ClinicModel = mongoose.model('Clinic', Clinicschema);


//module.exports = mongoose.model('Clinic', ClinicSchema);