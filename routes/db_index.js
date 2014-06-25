var models = require('../models');

exports.view = function(req, res){
	if (!req.session.username) {
		res.redirect('/landing');	
	}
	
	res.render('index');
};