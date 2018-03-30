window.onload = function(){
$("#activitylistart").hide();	
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
