var express = require('express');
var router = express.Router();
/* Import apis controllers */
var mapController = require('../controllers/map');
var userController = require('../controllers/user');
var clientController = require('../controllers/client');
var authController = require('../controllers/auth');


/* GET maps listing. */
router.post('/maps/', authController.isAuthenticated, mapController.postMaps )
	.get('/maps/', authController.isAuthenticated, mapController.getMaps )
	.get('/maps/:map_id', authController.isAuthenticated, mapController.getMap )
	.get('/mapsuser/:user_id', authController.isAuthenticated, mapController.getMapuser )
	.put('/maps/:map_id', authController.isAuthenticated, mapController.putMap )
	.delete('/maps/:map_id', authController.isAuthenticated, mapController.deleteMap );

/* GET users listing. */
router.post('/users/', userController.postUsers )
	.get('/users/', authController.isAuthenticated, userController.getUsers );

/* GET clients listing. */
router.post('/clients/', authController.isAuthenticated, clientController.postClients )
	.get('/clients/', authController.isAuthenticated, clientController.getClientsAll )
	.get('/clients/:client_id', authController.isAuthenticated, clientController.getClients );

module.exports = router;