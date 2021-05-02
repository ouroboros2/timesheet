
searchProject();
searchEmployee();
displayWeek();

function displayWeek() {
	var begin, end;

	if (Date.today().is().sunday())
		begin = new Date();
	else
		begin = new Date().last().sunday();

	if (Date.today().is().saturday())
		end = new Date();
	else
		end = new Date().next().saturday();
		
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

		for (var i = 0; i < employeeList.length; i++) {

			//below are the variables to be used for the
			//corresponding list in the table
			//store in hidden inputBox variables which are not displayed,
			//but to be sent when submitting. You can use alert or console to check the values
			var employeeId = employeeList[i].employeeId;
			var firstName = employeeList[i].firstName;
			var lastName = employeeList[i].lastName;
			var userName = employeeList[i].userName;
			var managerId = employeeList[i].managerId;
			var role = employeeList[i].role;
		}

		//uncomment below to check what is returned from backend
		//alert(JSON.stringify(employeeList));

	}).fail(function(xhr, textStatus, errorThrown) {
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

		for (var i = 0; i < projectList.length; i++) {

			//below are the variables to be used for the
			//corresponding list in the table
			//store in hidden inputBox variables which are not displayed,
			//but to be sent when submitting. You can use alert or console to check the values
			var projectId = projectList[i].projectId;
			var projectCode = projectList[i].projectCode;
			var projectDesc = projectList[i].projectDesc;
			var category = projectList[i].category;
			var projectOwner = projectList[i].projectOwner;
			var startDate = projectList[i].startDate;
			var endDate = projectList[i].endDate;

		}

		//uncomment below to check what is returned from backend
		//alert(JSON.stringify(projectList));

	}).fail(function(xhr, textStatus, errorThrown) {
		alert("xhr: " + xhr.responseText);
		//alert("textStatus: " + textStatus);
		//alert("errorThrown: " + errorThrown);
	});
}