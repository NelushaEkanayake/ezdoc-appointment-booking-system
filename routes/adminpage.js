var express = require('express');
var adrouter = express.Router();

/* GET home page. */
adrouter.get('/', function(req, res, next) {
  res.render('admin', { title: 'ezdoc' });
});

module.exports = adrouter;