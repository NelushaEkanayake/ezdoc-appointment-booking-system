var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Hospital = new Schema({


 
    regno: {
      type: String,
        default: ''
    },
    email: {
      type: String,
        default: ''
    },
    address: {
      type: String,
        default: ''
        
    },
    

    admin:   {
        type: Boolean,
        default: false
    }

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Hospital', Hospital);