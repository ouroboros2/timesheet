
searchProject();
searchEmployee();
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

function displayWeek() {
	$("#weekfromdate").text("Week " + begin.getWeek());
	$("#daterange").text(begin.toDateString() + " - " + end.toDateString());
}

//call this function through the searchIcon
function searchEmployee() {

	//If blank, will return all employees
	//get employee Username from Input Box (wildcard search)
	//var entry = input entered by user
	var entry = "";
	
	//convert entry to Employee object
	
	var employee = {
		userName: entry
	}	
	
	//call corresponding Ajax and pass the object
	findByEmployeeUserName(employee);
	
}

//call this function through the searchIcon
function searchProject() {
	
	//If blank, will return all employees
	//get ProjectCode from Input Box (wildcard Search)
	var entry = "";
	
	//convert entry to Project object
	
	var project = {
		projectCode: entry
	}
	
	
	//call corresponding Ajax and pass the object
	findByProjectCode(project);

}

function findByEmployeeUserName(employee) {
	var url = "/searchEmployee";
	$.post({
		type: "POST",
		url: url,
		data: JSON.stringify(employee),
		contentType: "application/json"
	}).done(function(employeeList) {
		
		alert(JSON.stringify(employeeList));
		
	}).fail(function(xhr, textStatus, errorThrown){
		alert("xhr: " + xhr.responseText);
		//alert("textStatus: " + textStatus);
		//alert("errorThrown: " + errorThrown);
	});
}

function findByProjectCode(project) {
	var url = "/searchProject";
	$.post({
		type: "POST",
		url: url,
		data: JSON.stringify(project),
		contentType: "application/json"
	}).done(function(projectList) {
		alert(JSON.stringify(projectList));
		
	}).fail(function(xhr, textStatus, errorThrown){
		alert("xhr: " + xhr.responseText);
		//alert("textStatus: " + textStatus);
		//alert("errorThrown: " + errorThrown);
	});
}