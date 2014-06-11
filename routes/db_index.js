var models = require('../models');

exports.view = function(req, res){
	var username = req.session.username;
	if (!req.session.username) {
		res.redirect('/landing');	
	}
	
	res.render('index');
};