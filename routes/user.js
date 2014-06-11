
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
  console.log('username is: '+username);
  req.session.username = username;

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
  res.redirect('/');
}

exports.logout = function(req, res) {
  req.session.username = null;

  res.redirect('/landing');
}