var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
var oauth2Controller = require('../controllers/oauth2');

// Create endpoint handlers for oauth2 authorize
// http://localhost/oauth2/authorize?client_id=id0&response_type=code&redirect_uri=http://localhost
router.get('/authorize', authController.isAuthenticated, oauth2Controller.authorization)
  .post('/authorize', authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.post('/token', authController.isClientAuthenticated, oauth2Controller.token); 

module.exports = router;