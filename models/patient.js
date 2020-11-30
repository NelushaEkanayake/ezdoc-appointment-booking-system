var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


/*var validateEmail = function(username) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(username)
};*/

var Patient = new Schema({
    username: {
      type: String,
      default: '',
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      //validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },

    
 
    lastname: {
      type: String,
        default: ''
    },
    NIC: {
      type: String,
        default: ''
    },
    FirstName: {
      type: String,
        default: ''
        
    },

    
    
    
    admin:   {
        type: Boolean,
        default: false
    },

    

    

});

Patient.plugin(passportLocalMongoose);

module.exports = mongoose.model('Patient', Patient);