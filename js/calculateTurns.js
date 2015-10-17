//////////////////////////////////////////////////////////
//	CREATED BY: George Michael
//	CREATED ON: 2015-10-18
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//	START	Calculate Turns MioVision
///////////////////////////////////////////////////////////


//Take the dataset entered into the text field and group the data by vehicle
//Compare the vehicle data with each region it intersects
function calculateTurns()
{
  var jsonObj = $.parseJSON($('.dataSet').val());
	
  groupByVehicle(jsonObj);
  findNumberOfTurns();
  
  $('.numberOfTurns').text("" + Right.toString() + "," + Straight.toString()+ "," +Left.toString()+ "," +UTurn.toString());
	
}

//Loop thought the json object searching for common vehicles and inserts them into the temptable
//If the vehicle does not exist in the table create new object
function groupByVehicle(json){


  json.forEach(function(obj) { 
	
	var plate = obj.vehicle;
	
    if(tempTable[plate] == undefined){
      tempTable[plate] = new Array();
    }
    tempTable[plate].push(obj);
	 
  });
  organizeVehicleByDate(tempTable);
  
}


//Convert to actual date time for compare
//But what happens if there is more then one occurence of the same car
//After comparing and organizing the collection, split the object into two
function organizeVehicleByDate(tempTable){
	
	for(var i in tempTable){
	
		tempTable[i].sort(function(timeArrival, timeDeparture) {
		  return new Date(timeArrival.time * 1000) - new Date(timeDeparture.time * 1000);
		});
	
	}
	splitCollection(tempTable);
}

//Split the collection if the object is greater then 2, which means
//that the same vehicle has gone through the intersection more then once
function splitCollection(tempTable){
		
	for(var j in tempTable){

		var option = tempTable[j].length;
		if(option > 2){
			
			var obj = tempTable[j].splice(2);
			tempTable[tempTable[j].vehicle] = obj;
			organizeVehicleByDate(tempTable);
		}
	}
}

//Checks the tempTable comparing 1st and 2nd region
//For each collection, and returns the Type of the 
//Turn (left,right,straight,uTurn), depending what is returned
//Update the couter associated to that that turn.
//Calulate the turns and concat to string to display to UI
function findNumberOfTurns(){
	var collectionOfTurns;
	
		for(var i in tempTable){
	
			var startRegion = tempTable[i][0].region;
			var endRegion = tempTable[i][1].region;
			var options;
			if(startRegion == 1){
				options = lane1Options;
			}else if(startRegion == 2){
				options = lane2Options;
			}else if(startRegion == 3){
				options = lane3Options;
			}else if(startRegion == 4){
				options = lane4Options;
			}
			console.log(startRegion);
			console.log(endRegion);
			$.each(options, function(k, v) {
             if(k == endRegion){
			 //display the key and value pair
				console.log(' is ' + v + ' turn ');
				window[v]++;
				console.log(window[v]);
			}
		});		
			
	}
	
}


//These are the lane options for the intersection
//Each lane that is an exit lane starts from 1-4 enter lanes are 5-8
var lane1Options = {
    7: "Straight",
    6: "Right",
    8: "Left",
    5: "UTurn"
};

var lane2Options = {
    8: "Straight",
    7: "Right",
    5: "Left",
    6: "UTurn"
};

var lane3Options = {
    5: "Straight",
    8: "Right",
    6: "Left",
    7: "UTurn"
};

var lane4Options = {
    6: "Straight",
    5: "Right",
    7: "Left",
    8: "UTurn"
};

//Counters for each turn
var Left = 0;
var Right = 0;
var Straight = 0;
var UTurn = 0;

//Table to hold the vehicles by "Vehicle" From the DataSet
var tempTable = new Object();


///////////////////////////////////////////////////////////
//	End	Calculate Turns MioVision
///////////////////////////////////////////////////////////