window.onload = function(){
$("#activitylistart").show();	
$("#activitylistfoodanddrink").hide();
$("#activitylistfitness").hide();
$("#activitylistsports").hide();
$("#activitylistgames").hide();
};

function displayart() {
$("#activitylistart").show();
$("#activitylistfoodanddrink").hide();
$("#activitylistfitness").hide();
$("#activitylistsports").hide();
$("#activitylistgames").hide();
}

function displayfoodanddrink() {
$("#activitylistfoodanddrink").show();
$("#activitylistart").hide();
$("#activitylistfitness").hide();
$("#activitylistsports").hide();
$("#activitylistgames").hide();
}

function displayoutdoor() {
$("#activitylistfitness").show();
$("#activitylistart").hide();
$("#activitylistfoodanddrink").hide();
$("#activitylistsports").hide();
$("#activitylistgames").hide();
}

function displaysports() {
$("#activitylistsports").show();
$("#activitylistart").hide();
$("#activitylistfoodanddrink").hide();
$("#activitylistfitness").hide();
$("#activitylistgames").hide();
}

function displaygames() {
$("#activitylistgames").show();
$("#activitylistart").hide();
$("#activitylistfoodanddrink").hide();
$("#activitylistfitness").hide();
$("#activitylistsports").hide();

}


function submitfunction(event) {
	
	var interests = [];
	$("input[name = vehicle]:checked").each(function(){
		interests.push($(this).val());
	});

	var name = $("#username").val().trim();
    var picture = $("#photo").val().trim();
    var zipcode = $("#zipcode").val().trim();
    
    var newUser = {
    	name: name,
    	picture: picture,
    	zipcode: zipcode,
    	interests: interests
    };
    console.log(newUser);
    $.ajax("api/user", {
    	type: "POST",
		data: newUser
		}).then(function() {
			console.log("created new user");
			location.replace("/user");
		});

}

function updatefunction(event) {
	
	var interests = [];
	$("input[name = vehicle]:checked").each(function(){
		interests.push($(this).val());
	});

	var name = $("#username").val().trim();
    var picture = $("#photo").val().trim();
    var zipcode = $("#zipcode").val().trim();
    
    var newUser = {
    	name: name,
    	picture: picture,
    	zipcode: zipcode,
    	interests: interests
    };
    console.log(newUser);
    $.ajax("api/user", {
    	type: "PUT",
		data: newUser
		}).then(function() {
			console.log("updated user");
			location.replace("/user");
		});

}