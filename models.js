var Mongoose = require('mongoose');

var RatingSchema = new Mongoose.Schema({
	"resident": String,
	"faculty": String,
	"date": Date,
	"procedure": String,
	"respectForTissue": Number,
	"timeAndMotion": Number,
	"instrumentHandling": Number,
	"knowledgeOfInstrument" : Number,
	"flowOfOperation": Number,
	"useOfAssistants": Number,
	"knowledgeOfProcedure" : Number,
	"comments" : String
});

var UserSchema = new Mongoose.Schema({
	"username": String,
	"role": Number,
	"hash": String,
	"salt": String
});

exports.Rating = Mongoose.model('Rating', RatingSchema);
exports.User = Mongoose.model('User', UserSchema);