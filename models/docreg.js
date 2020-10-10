var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Doctor = new Schema({


 
    regno: {
      type: String,
        default: ''
    },
    email: {
      type: String,
        default: ''
    },
    

    admin:   {
        type: Boolean,
        default: false
    }

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Doctor', Doctor);