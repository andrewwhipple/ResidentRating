var models = require('../models');

exports.view = function(req, res){
	var username = req.session.username;
	if (!req.session.username) {
		res.redirect('/landing');	
	}
	
	models.Rating
		.find({"faculty": username})
		.sort('resident')
		.exec(renderRatings);
		
	function renderRatings(err, ratings) {
		var nRate = false;
		if (ratings.length > 0) nRate = true;
		res.render('viewstats.handlebars', {'ratings': ratings, 'nRate': nRate});
		console.log(ratings);	
		
	}
};