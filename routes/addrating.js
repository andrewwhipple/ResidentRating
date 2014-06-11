var models = require('../models');

exports.add = function(req, res) {

	var newRating = new models.Rating({
		"resident": req.query.resident,
		"faculty": req.query.faculty,
		"date": req.query.date,
		"procedure": req.query.procedure,
		"respectForTissue": req.query.respect,
		"timeAndMotion": req.query.time,
		"instrumentHandling": req.query.handling,
		"knowledgeOfInstrument": req.query.instKnowledge,
		"flowOfOperation": req.query.flow,
		"useOfAssistants": req.query.assistants,
		"knowledgeOfProcedure": req.query.procedureKnowledge,
		"comments": req.query.comments
	});
	newRating.save(afterSaving);
	console.log(newRating);
	function afterSaving(err) {
		if (err) {
				console.log(err);
				res.send(500);	
		} 
	}
	var result = { "message": "Rating Added" };
	res.send(result);
}