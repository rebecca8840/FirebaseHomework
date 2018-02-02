

$("#addTrain").on("click", function(){

	var trainName = $("#trainName-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var trainTime = $("#trainTime-input").val().trim();
	var frequency = $("#frequency-input").val().trim();

	// value fields for db
	
	var train = {
		Name: trainName,
		Destination: destination,		
		FirstTrainTime: trainTime,
		Frequency: frequency,
		r_createDate: firebase.database.ServerValue.TIMESTAMP
	}

	// upload input data into db

	database.ref().push(train);

	// Clears all of the text-boxes
	$("#trainName-input").val("");
	$("#destination-input").val("");
	$("#trainTime-input").val("");
	$("#frequency-input").val("");

	// Prevents moving to new page
	return false;
});


function monthDiff(d1, d2) {
   var months;
   months = (d2.getFullYear() - d1.getFullYear()) * 12;
   months -= d1.getMonth() + 1;
   months += d2.getMonth();
   return months <= 0 ? 0 : months;
}

	database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().Name;
	var destination = childSnapshot.val().Destination;
	var trainTime = childSnapshot.val().FirstTrainTime;
	var Frequency = childSnapshot.val().Frequency;


	//calculate the number of months difference between now() and startDate
	var empDate = new Date(employeeStart);


    var myDate = new Date();


    var employeeMonths = monthDiff(empDate,myDate);

	
	//calculate the months worked (now()-start date) * rate = totalBIlled

	var totalBilled = (employeeMonths * employeeRate);



	//write fields to html

$("#employeeTable > tbody").append("<tr><td>" + employeeName + "</td><td>" + employeeRole + "</td><td>" + employeeStart + "</td><td>" + employeeMonths + "</td><td>" + employeeRate + "</td><td>" + totalBilled + "</td></tr>");

});	//catch false input