var models = require('../models');

exports.view = function(req, res){
	var username = req.session.username;
	if (!req.session.username) {
		res.redirect('/landing');	
	}
	
	if (req.session.role == 1) {
		//Is resident
		models.Rating
			.find({"resident": username})
			.sort('procedure')
			.exec(renderRatings);
	} else if (req.session.role == 2) {
		models.Rating
			.find({"faculty": username})
			.sort('resident')
			.exec(renderRatings);
	} else {
		models.Rating
			.find()
			.sort('resident')
			.exec(renderRatings)
	}
	
	function renderRatings(err, ratings) {
		var nRate = false;
		if (ratings.length > 0) nRate = true;
		res.render('viewstats.handlebars', {'ratings': ratings, 'nRate': nRate});
		console.log(ratings);	
		
	}
};