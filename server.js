const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({

    service:'gmail',
    auth:{
        user:'nelushacis@gmail.com',
        pass:'Green8#123'
    }
});


let mailOption = {
    from:'nelushacis@gmail.com',
    to:'nelushapcm@gmail.com',
    subject:'testing',
    text:'hello world'
};

transporter.sendMail(mailOption, function(err, data){
    if(err){
        console.log('error occure');
    } else{
        console.log('email sent!!');
    }
})