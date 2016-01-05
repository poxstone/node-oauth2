// Load required packages
var Client = require('../models/client');

// Create endpoint /api/client for POST
exports.postClients = function(req, res) {

	// Create a new instance of the Client model
	var client = new Client();

	// Set the client properties that came from the POST data
	client.name = req.body.name || null;
	client.id = req.body.id || null;
	client.secret = req.body.secret || null;
	client.userId = req.user._id || null;

	if( req.body.name && req.body.id && req.body.secret && req.user._id ){

		// Save the client and check for errors
		client.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Client added to the locker!', data: client });
		});

	}else{
		res.json({ message: 'complete los campos' });
	}

};

// Create endpoint /api/clients for GET
exports.getClientsAll = function(req, res) { 
	// Use the Client model to find all clients
	Client.find(function(err, clients) {
		if (err)
			res.send(err);

		res.json(clients);
	});
};

// Create endpoint /api/clients for GET
exports.getClients = function(req, res) {
	console.log('req.user._id: ',req.user._id);
	// Use the Client model to find all clients
	Client.find({ userId: req.user._id }, function(err, clients) {
		if (err)
			res.send(err);

		res.json(clients);
	});
};