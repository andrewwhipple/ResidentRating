'use strict';


//var data = require('../data.json');

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	
	$("#submitBtn").click(submitClicked);
	
	$(function() {
          $.stayInWebApp('a.stay');
    });

})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript!");
}

function submitClicked(e) {
	e.preventDefault();
		
	
	
}
