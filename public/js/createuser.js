'use strict';

//var data = require('../data.json');

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	console.log("in the create");
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript!");
	$("#submitButton").click(submitClicked);
	$('#homeButton').hide();	
}

function submitClicked(e) {
	console.log("CLICKED");
	e.preventDefault();
	console.log("where Am I");
	var username = $("input[name='username']").val();
	console.log("heres the name");
	console.log(name);
	var password = $("input[name='password']").val();
	var role = $("input[name='role']:checked").val();	
	
	console.log(username);
	if (username == '') {
		var message = 'Please enter your name.';
		$('#message').removeClass();
		$('#message').addClass("alert alert-danger");
		$('#message').show();
		$('#message').html(message + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
	} else if (password == '') {
		var message = 'Please enter a password';
		$('#message').removeClass();
		$('#message').addClass("alert alert-danger");
		$('#message').show();
		$('#message').html(message + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
		
	} else {
		var parameters = {'username': username, 'role': role, 'password': password};
		$.get('/user_create', parameters, writeData);
		
	}
	
}

function writeData(results) {
	var message = results["message"];
	var success = results["success"];
	console.log(message);
	console.log(success);
	$('#message').removeClass();
	if (success) {
		$('#message').addClass("alert alert-success");
	} else {
		$('#message').addClass("alert alert-danger");
	}
	$('#message').show();
	$('#message').html(message + "<button type='button' class='close'>&times;</button>");
	$('.close').click(function () {
    	$('#message').hide();
	});
	if (success) {
		$('#homeButton').show();
	}
	
	
}
