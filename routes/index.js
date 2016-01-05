var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'add Users' });
});

router.get('/clients', authController.isAuthenticated, function(req, res, next) {
  res.render('clients', { title: 'add clients' });
});

router.get('/token', authController.isAuthenticated, function(req, res, next) {
  res.render('token', { title: 'add token',code: req.query.code });
});

router.get('/maps', function(req, res, next) {
  //console.log('req.params.user_id: ',req.params.user_id);
  res.header({
    //"Content-Security-Policy":"default-src 'self';script-src 'self';object-src'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'",
    "etag":"W/\"7c0-j3hkc9STdYut/WOnn1oySQ"//is for cache browser 
  });
  res.render('maps', { title: 'Express' });
});

module.exports = router;