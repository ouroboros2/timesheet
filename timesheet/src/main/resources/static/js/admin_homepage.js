searchProject();
searchEmployee();
//displayWeek();

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

	$("#employeeTable tbody").empty();

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

	$("#taskTable tbody").empty();

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

			var cempId = document.createElement('td');
			var cempFname = document.createElement('td');
			var cempLname = document.createElement('td');
			var cempUsername = document.createElement('td');
			var cmanager = document.createElement('td');
			var cempRole = document.createElement('td');

			cempId.textContent = employeeId;
			cempFname.textContent = firstName;
			cempLname.textContent = lastName;
			cempUsername.textContent = userName;
			cmanager.textContent = managerId;
			cempRole.textContent = role;

			$("#employeeTable tbody").append(
				$('<tr>').append(cempId, cempFname, cempLname, cempUsername, cmanager, cempRole)
			);
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

			var cprojectId = document.createElement('td');
			var cprojectCode = document.createElement('td');
			var cprojectDesc = document.createElement('td');
			var cprojectCat = document.createElement('td');
			var cprojectStartDate = document.createElement('td');
			var cprojectEndDate = document.createElement('td');

			cprojectId.textContent = projectId;
			cprojectCode.textContent = projectCode;
			cprojectDesc.textContent = projectDesc;
			cprojectCat.textContent = category;
			cprojectStartDate.textContent = startDate;
			cprojectEndDate.textContent = endDate;

			$("#taskTable tbody").append(
				$('<tr>').append(cprojectId, cprojectCode, cprojectDesc, cprojectCat, cprojectStartDate, cprojectEndDate)
			);
		}

		//uncomment below to check what is returned from backend
		//alert(JSON.stringify(projectList));

	}).fail(function(xhr, textStatus, errorThrown) {
		alert("xhr: " + xhr.responseText);
		//alert("textStatus: " + textStatus);
		//alert("errorThrown: " + errorThrown);
	});
}

//If a task was clicked
$("#taskTable tbody").on("click", "tr", function() {
	$("#btnEditTask").prop('hidden', false);
	$("#btnDeleteTask").prop('hidden', false);
	
	$("#btnEditTask").val($(this).find("td:first").text());
	$("#btnDeleteTask").val($(this).find("td:first").text());
});

function editProject() {
	alert('Edit');
}

function deleteProject() {
	$('a').attr("href", "/deleteProject/" + $("#btnDeleteEmployee").val());
	//alert('Delete');
}



//If an employee was clicked
$("#employeeTable tbody").on("click", "tr", function() {
	$("#btnEditEmployee").prop('hidden', false);
	$("#btnDeleteEmployee").prop('hidden', false);
	
	$("#btnEditEmployee").val($(this).find("td:first").text());
	$("#btnDeleteEmployee").val($(this).find("td:first").text());
});

function editEmployee() {
	alert('Edit');
}

function deleteEmployee() {
	$('a').attr("href", "/deleteEmployee/" + $("#btnDeleteEmployee").val());
	//alert('Delete');
}
