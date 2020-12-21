var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ title: 'ezdoc' });
});

router.get('/adminpage', function(req, res, next) {
  res.render('admin', { title: 'ezdoc' });
});

router.get('/doctorpage', function(req, res, next) {
  res.render('DoctorPanel', { title: 'ezdoc' });
});

router.get('/channelpage', function(req, res, next) {
  res.render('channel', { title: 'ezdoc' });
});

module.exports = router;

