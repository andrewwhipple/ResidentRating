
/*
 * GET users listing.
 */

var models = require('../models');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res) {
  // remember the username
  var username = req.query.username;
  var pass = req.query.password;
  console.log('username is: '+username);
  
  models.User
  	.find({"username": username})
  	.exec(afterQuery);
  	
  function afterQuery(err, users) {
		if (err) res.send(500);
		if(!users.length) {
			var result = {"message": "No user with that name found.", "success": false};
			res.send(result);
		} else if (users[0]["password"] == pass) {
			req.session.username = username;
			req.session.role = users[0]["role"];
			var result = {"message": "Logged in.", "success": true};
			res.send(result);	
		} else {
			var result = {"message": "Incorrect password.", "success": false}
			res.send(result);
		}	
	}	


  //req.session.password = password;
  

	/*models.User.find({"name": username}).exec(afterQuery);
	
	function afterQuery(err, user) {
		if (err) res.send(500);
		if(!user.length) {
			var newUser = new models.User({
				"name": username,
				"activities": []
			});
			newUser.save(afterSaving);
			console.log(newUser);
			function afterSaving(err){
			if (err){ 
				console.log(err);
				res.send(500);
			}
			res.send()
			}

		} else {
			console.log("This thingy here...");	
		}
	}*/

  // send them back to the homepage
}

exports.logout = function(req, res) {
  req.session.username = null;

  res.redirect('/landing');
}

exports.add = function(req, res) {
	var username = req.query.username;
	var password = req.query.password;
	var role = req.query.role;
	
	models.User
		.find({'username': username})
		.exec(afterQuery);
	
	function afterQuery(err, user) {
		if (err) res.send(500);
		if(!user.length) {
			var newUser = new models.User({
				"username": username,
				"role": role,
				"password": password
			});
			newUser.save(afterSaving);
			console.log(newUser);
			function afterSaving(err){
			if (err){ 
				console.log(err);
				res.send(500);
			}
			var result = {"message": "User successfully added!", "success": true}
			req.session.username = username;
			req.session.role = role;
			res.send(result);
			}

		} else {
			var result = {"message": "User already in system. Please choose another user.", "success": false}
			res.send(result);
		}	
	}	
	
}