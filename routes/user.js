/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * Bytesize.
 */

var len = 128;

/**
 * Iterations. ~300ms
 */

var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

function hash(pwd, salt, fn) {
  if (3 == arguments.length) {
    crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
      fn(err, hash.toString('base64'));
    });
  } else {
    fn = salt;
    crypto.randomBytes(len, function(err, salt){
      if (err) return fn(err);
      salt = salt.toString('base64');
      crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
        if (err) return fn(err);
        fn(null, salt, hash.toString('base64'));
      });
    });
  }
};



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
  		if (!users.length) {
  			var result = {"message": "No user with that name found.", "success": false};
  			res.send(result);	
  		} else {
  			console.log(username +", "+users[0]["role"]+": \n"+users[0]["hash"]);
  			hash(pass, users[0]["salt"], afterHash);
  		}
  		
  		 function afterHash(err, hash){
  				if(err) res.send(500);
  				if (hash == users[0]["hash"]) {
  					req.session.username = username;
  					req.session.role = users[0]["role"];
  					var result = {"message": "Logged in.", "success": true};
  					res.send(result);	
  				} else {
  					var result = {"message": "Incorrect password", "success": false};
  					res.send(result);	
  				}
  		 }
  	}
  	/*function afterQuery(err, users) {
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
	}*/	


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
	var pass2 = req.query.pass2;
	
	if (pass2 != password) {
		var result = {"message": "Passwords do not match.", "success": false}
		res.send(result);

	}
	
	var role = req.query.role;
	
	var userHash;
	var userSalt;
	hash(password, afterHash);
	
	function afterHash(err, salt, hash) {
		if (err) throw err;
		userHash = hash;
		console.log(typeof(userHash));
		userSalt = salt;
		console.log('/n'+userSalt);
		
		models.User
		.find({'username': username})
		.exec(afterQuery);
	
		function afterQuery(err, user) {
			if (err) res.send(500);
			if(!user.length) {
				var newUser = new models.User({
					"username": username,
					"role": role,
					"hash": userHash,
					"salt": userSalt
				});
				console.log(typeof(newUser["hash"]));
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
	
		
}