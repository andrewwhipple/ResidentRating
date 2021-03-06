
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'resident_rating';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var data_json = require('./data.json');

// Step 2: Remove all existing documents
models.Rating
  .find()
  .remove()
  .exec(onceClear); // callback to continue at

models.User
	.find()
	.remove()
	.exec(onceRealClear);
// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);
  console.log("helooooooo");

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = data_json.length;
  console.log(to_save_count);
  console.log("SAVED");
  for(var i=0; i<data_json.length; i++) {
    console.log(i);
    var json = data_json[i];
    var activ = new models.Rating(json);

    activ.save(function(err, activ) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }
  
}

function onceRealClear(err) {
	if(err) console.log(err);
	console.log("swagggggg");
	
	//mongoose.connection.close();
	
}


