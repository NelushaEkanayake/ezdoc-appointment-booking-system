var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
//var ClinicSchema = require('./common');

var appointmentSchema = new Schema({
    
    author:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },

    number: {
      type:Number
    }
}, {
    timestamps: true
});

mongoose.model('Appointment', appointmentSchema);


var clinicschema = new mongoose.Schema({

     clinicname: {
      type: String,
        default: ''
    },
 
    time: {
      type: String,
        default: ''
    },

    Date: {
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

    clinicid:{
      type: String,
        default: ''
      },

      state:{
        type: String,
          default: ''
        },
    

        hospital:  {
        type: String,
        default: ''
    },
    appointments:[appointmentSchema]
  },{
    timestamps: true
  }

);

//Clinicschema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Clinic', clinicschema);

 

 //module.exports.ClinicModel = mongoose.model('Clinic', Clinicschema);


//module.exports = mongoose.model('Clinic', ClinicSchema);