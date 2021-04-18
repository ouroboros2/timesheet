function addToTimesheet() {

	var taskList = [];
	var taskListObjs = [];
	$('input[name=tasks]:checked').map(function() {
		taskList.push($(this).val());
		$(this).parent().parent().hide();
		$(this).prop("checked", false);
	});

	for (var i = 0; i < taskList.length; i++) {

		var taskDetails = taskList[i].split("|");
		var taskobj = {
			projectCode: taskDetails[0],
			projectId: taskDetails[1],
			projectDesc: taskDetails[2],
			projectCategory: taskDetails[3]

		}
		taskListObjs.push(taskobj);
	}

	for (var i = 0; i < taskListObjs.length; i++) {

		const cprojectId = document.createElement('td');
		const cprojectDesc = document.createElement('td');
		const cprojectCategory = document.createElement('td');
		const cpInput = document.createElement('input');
		const separator = document.createElement('input');
		

		cprojectId.textContent = taskListObjs[i].projectCode + taskListObjs[i].projectId;
		cprojectDesc.textContent = taskListObjs[i].projectDesc;
		cprojectCategory.textContent = taskListObjs[i].projectCategory;
		cpInput.value = taskListObjs[i].projectId;
		cpInput.className = "parse" + taskListObjs[i].projectId;
		cpInput.hidden = true;
		separator.value = "|"
		separator.className = "parse" + taskListObjs[i].projectId;
		separator.hidden = true;

		$("#taskTable").append(
			$('<tr>', { id: "data" + taskListObjs[i].projectId }).append(cprojectId, cprojectDesc, cprojectCategory,cpInput)			
		);
		
		var count = 0
		while (count < 7) {
			$("#" + "data" + taskListObjs[i].projectId).append("<td><input class='" + "parse" + taskListObjs[i].projectId + "' size='2'></td>");
			count++;
		}
		$("#" + "data" + taskListObjs[i].projectId).append(separator);
	}
	taskList = [];
	taskListObjs = [];

}

//datejs for date range; see displayWeek() for formatted sql date
//https://github.com/datejs/Datejs --> see for documentation

var days = 0;
var begin, end;

if (Date.today().is().sunday())
	begin = new Date();
else
	begin = new Date().last().sunday();

if (Date.today().is().saturday())
	end = new Date();
else
	end = new Date().next().saturday();

displayWeek();

function previousWeek() {
	begin = begin.addDays(-7);
	end = end.addDays(-7);
	displayWeek();
}

function nextWeek() {
	begin = begin.addDays(7);
	end = end.addDays(7);
	displayWeek();
}

function displayWeek() {
	$("#weekfromdate").text("Week " + begin.getWeek());
	$("#daterange").text(begin.toDateString() + " - " + end.toDateString());
	
	//formatted date for db
	console.log(begin.toString("yyyy-MM-dd"));
	console.log(end.toString("yyyy-MM-dd"));
}

function insert() {
	var time = [];
	
	$('[class^="parse"]').map(function() {		
		time.push($(this).val());
	});
	
	var data = JSON.stringify(time);
	data = data.replace(/\"/g, "");
	data = data.replace(/[\[\]']+/g,'');
	var projects = data.split("|");
	
	//alert(projects);
	//returnJson();
	saveSomething();
}


function returnJson() {
	
	alert("test");
	
	$.ajax({
		type : "POST",
		contentType: "application/json",
		url : window.location + "/returnJson",
		data: JSON.stringify(),
		dataType: "json",
		success: function(result) {
			alert(result);
		}
	})
	
	alert("test2");
	
}


function saveSomething() {
	var contextPath = "[[@{/}]]";
	
	var url = "/viewTask/save";
	var jsonData = {projectCode: "projectCode"};
		
	$.post({
		type: "POST",
		url: url,
		data: JSON.stringify(jsonData),
		contentType: "application/json"
	}).done(function(someString) {
		alert("Your data was saved");
		alert(someString);
	}).fail(function(xhr, textStatus, errorThrown){
		alert("xhr: " + xhr.responseText);
		alert("textStatus: " + textStatus);
		alert("errorThrown: " + errorThrown);
	});
	
}

