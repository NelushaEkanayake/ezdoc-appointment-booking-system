var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//var clinic = require('./models/clinic');
//var ClinicSchema = require('./common');
//const { Clinicschema , ClinicModel } = require('./clinicd.js');
//var { Clinicschema , ClinicModel } = require('./clinicd');

/*var clinicSchema = new Schema({
    clinicname:  {
        type: String,
        required: true
    },
    time:  {
        type: String,
        required: true
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Doctor'
    },
     hospital:  {
        type: String,
        default: ''
    }

}, {
    timestamps: true
});
*/

var Doctor = new Schema({

    username: {
      type: String,
      default: '',
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      //validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },

     doctorname: {
      type: String,
        default: ''
    },
 
    regno: {
      type: String,
        default: ''
    },
    
    

    admin:   {
        type: Boolean,
        default: false
    }

    //comments:[clinicSchema]

 }, {
    timestamps: true

    



    

});

Doctor.plugin(passportLocalMongoose);

module.exports = mongoose.model('Doctor', Doctor);

