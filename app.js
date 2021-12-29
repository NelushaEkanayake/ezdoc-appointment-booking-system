require('./models/db');
var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
var hbs = require('express-handlebars');



var indexRouter = require('./routes/index');
var patientRouter = require('./routes/patients');
var doctorRouter = require('./routes/doctors');
var adminRouter = require('./routes/adminRouter');
var clinicRouter = require('./routes/clinic');
var hclinicRouter = require('./routes/hclinic');
var pclinicRouter = require('./routes/pclinic');
var adminpageRouter = require('./routes/adminpage');





const mongoose = require('mongoose');



/*const url = config.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

require('./models/clinicd');*/
var app = express();
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(express.static(__dirname + '/views'));
//app.use(express.static(path.join(__dirname, '/public')));
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(__dirname + '/views'));
//app.use(express.static(path.join(__dirname, '/public')));
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));*/

app.use(passport.initialize());
//app.use(passport.session());

app.use('/', indexRouter);
app.use('/adminpage', adminpageRouter);
app.use('/users', patientRouter);
app.use('/doctors', doctorRouter);
app.use('/admins', adminRouter);







app.use(express.static(path.join(__dirname, 'public')));

app.use('/doctor', clinicRouter);
app.use('/hospital', hclinicRouter);
app.use('/', pclinicRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
