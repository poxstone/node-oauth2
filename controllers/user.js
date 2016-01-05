// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User();
    user.username = req.body.username || null;
    user.password = req.body.password || null;
  
  if(user.username && user.password){
	  user.save(function(err) {
	    if (err){
	      res.send(err);
	    }else{
	    	res.json({ message:'otro borracho mas', user:user});
	    }
	  });
  }else{
	  res.json({ message: 'los campos están vacios' });
  }
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};