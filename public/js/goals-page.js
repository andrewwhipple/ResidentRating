'use strict';


//var data = require('../data.json');

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	
	$("#submitBtn").click(submitClicked);
	
	$(".closeUpShop").click(closeUp);
	
	$('a[title]').qtip({
        show: {
        	event: 'click',
        	solo: true
        },
        hide: 'click'
    });
    
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

function closeUp(e) {
	console.log("HERE YO DUDESON");
	e.preventDefault();
	window.open('', '_self');
	window.close();	
	
}
function ShowDialog(contentContainer) {
	$(this).qTip({
		// init to use the contents of the specified
		// container, show the tooltip when ready,
		// and destroy it on the hide event
	});
}
 



function submitClicked(e) {
	console.log("CLICKED");
	e.preventDefault();
	var resident = $("#resident").val();
	
	console.log("the name is");
	console.log(resident);
	var faculty = $("#faculty").val();
	
	var theDate = $("#date").val();
	var date = theDate.toString('yyyy-MM-dd');
	
	var procedure = $("#procedure").val();
	if (procedure == "Other") procedure = $('#other').val();
	
	//var respectForTissue = $("respectForTissue").val();
	//console.log(respectForTissue);
	var respect = $("input[name='respectForTissue']:checked").val();
	var time = $("input[name='timeAndMotion']:checked").val();
	var handling = $("input[name='instrumentHandling']:checked").val();
	var instKnowledge = $("input[name='knowledgeOfInstrument']:checked").val();
	var flow = $("input[name='flowOfOperation']:checked").val();
	var assistants = $("input[name='useOfAssistants']:checked").val();
	var procedureKnowledge = $("input[name='knowledgeOfProcedure']:checked").val();
	var comments = $("#comments").val();
	
	
	
	console.log (resident + "/" + faculty + "/" + date + "/" + procedure + "/" + respect + time + handling + instKnowledge + flow + assistants + procedureKnowledge + "/" + comments);
	var parameters = {
		"resident": resident,
		"faculty": faculty,
		"date": date,
		"procedure": procedure,
		"respect": respect,
		"time": time,
		"handling": handling,
		"instKnowledge": instKnowledge,
		"flow": flow,
		"assistants": assistants,
		"procedureKnowledge": procedureKnowledge,
		"comments": comments
	};
	
	if (resident == '') {
		var message = 'Please enter a resident.';
		$('#message').removeClass();
		$('#message').addClass("alert alert-danger");
		$('#message').show();
		$('#message').html(message + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
	} else if (faculty == '') {
		var message = 'Please enter a faculty name';
		$('#message').removeClass();
		$('#message').addClass("alert alert-danger");
		$('#message').show();
		$('#message').html(message + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
		
	} else if (date == '') {
		var message = 'Please select a date';
		$('#message').removeClass();
		$('#message').addClass("alert alert-danger");
		$('#message').show();
		$('#message').html(message + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
	} else {
	
		$.get('/addrating', parameters, writeData);
		
	}
	if (0 == 1) {
		//$(".goalList").append('<div class="goal"><h4>' + name + ": " + target + '</h4> <button type="button" class="editGoalButton"><a href="/editindividual">Edit Goal</a></button> </div>');
		console.log("made it into clicker");
		var parameters = {'activity': name, 'hours': 0, 'goal': target};
		console.log(parameters);
		console.log("about to go");
		$.get('/addactivitydata', parameters, writeData);
		//$(".editGoalButton").click(editGoalClicked);
		//$(".deleteGoalButton").click(deleteGoalClicked);
	}
	/*var newActivity = 
	{
		"activity": name,
		"hours": 0,
		"goal": target
	};
	data["activities"].push(newActivity);*/
}

function writeData(results) {
	console.log("WHOOOO");
	var message = results['message'];
	$('#message').removeClass();
	$('#message').addClass("alert alert-success");
	$('#message').show();
	$('#message').html(message + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
	
}

	
