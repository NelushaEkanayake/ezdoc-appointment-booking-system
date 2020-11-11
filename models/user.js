var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


/*var validateEmail = function(username) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(username)
};*/

var User = new Schema({
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
    firstname: {
      type: String,
        default: ''
        
    },

    
    
    
    admin:   {
        type: Boolean,
        default: false
    },

    

    

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);