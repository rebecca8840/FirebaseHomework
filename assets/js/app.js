$( document ).ready() 

$("#addTrain").on("click", function(){

	var trainName = $("#trainName-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var trainTime = $("#trainTime-input").val().trim();
	var frequency = $("#frequency-input").val().trim();


	var database = firebase.database();


	$("#addTrain").on("click", function() {

	var train = {
		Name: trainName,
		Destination: destination,		
		FirstTrainTime: trainTime,
		Frequency: frequency,
		r_createDate: firebase.database.ServerValue.TIMESTAMP
	}

	database.ref().push(train);


	$("#trainName-input").val("");
	$("#destination-input").val("");
	$("#trainTime-input").val("");
	$("#frequency-input").val("");

	return false;
});

	database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());


	var trainName = childSnapshot.val().Name;
	var destination = childSnapshot.val().Destination;
	var trainTime = childSnapshot.val().FirstTrainTime;
	var Frequency = childSnapshot.val().Frequency;

    var tFrequency = 30;

    var firstTimeConverted = moment(trainTime, "hh:mm")

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % tFrequency;

    var tMinutesTillTrain = tFrequency - tRemainder;


    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  

$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +  trainTime + "</td><td>" + frequency + "</td><td>");

});	