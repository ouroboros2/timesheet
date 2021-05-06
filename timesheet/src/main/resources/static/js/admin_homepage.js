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
	var entry = $("#empsearch").val();

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
	var entry = $("#projsearch").val();
	//convert entry to Project object

	var project = {
		projectCode: entry
	}

	$("#projectTable tbody").empty();

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
			var password = employeeList[i].password;
			var managerId = employeeList[i].managerId;
			var role = employeeList[i].role;

			var cempId = document.createElement('td');
			var cempFname = document.createElement('td');
			var cempLname = document.createElement('td');
			var cempUsername = document.createElement('td');
			var cmanager = document.createElement('td');
			var cempRole = document.createElement('td');
			var cempPass = document.createElement('td');
			

			cempId.textContent = employeeId;
			cempFname.textContent = firstName;
			cempLname.textContent = lastName;
			cempUsername.textContent = userName;
			cmanager.textContent = managerId;
			cempRole.textContent = role;
			cempPass.textContent = password;
			cempPass.hidden = true;

			$("#employeeTable tbody").append(
				$('<tr>').append(cempId, cempFname, cempLname, cempUsername, cmanager, cempRole, cempPass).attr("id", employeeId).attr('id', employeeId)
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
			var cprojectOwner = document.createElement('td');

			cprojectId.textContent = projectId;
			cprojectCode.textContent = projectCode;
			cprojectDesc.textContent = projectDesc;
			cprojectCat.textContent = category;
			cprojectStartDate.textContent = startDate.substring(0, 10);
			cprojectEndDate.textContent = endDate.substring(0, 10);
			cprojectOwner.textContent = projectOwner;
			cprojectOwner.hidden = true;

			$("#projectTable tbody").append(
				$('<tr>').append(cprojectId, cprojectCode, cprojectDesc, cprojectCat, cprojectStartDate, cprojectEndDate, cprojectOwner).attr('id', projectId)
			);
		}

		//uncomment below to check what is returned from backend
		//(JSON.stringify(projectList));

	}).fail(function(xhr, textStatus, errorThrown) {
		alert("xhr: " + xhr.responseText);
		//alert("textStatus: " + textStatus);
		//alert("errorThrown: " + errorThrown);
	});
}

//If a project was clicked; DONE
//Note: Values here are based on table row indexes. Change these if indexes were altered.
$("#projectTable tbody").on("click", "tr", function() {
	const $btnEdit = $("#btnEditProject");
	const $btnDelete = $("#btnDeleteProject");

	if ($(this).hasClass('table-active')) {
		
		$(this).removeClass('table-active');
		
		$btnEdit.prop('hidden', true);
		$btnDelete.prop('hidden', true);
		$btnEdit.removeAttr('value');
		$btnDelete.removeAttr('value');	
	} else {
		
		$("#projectTable tr.table-active").filter(function() {
			$(this).removeClass('table-active');
		});

		$(this).addClass('table-active');
		$btnEdit.prop('hidden', false);
		$btnDelete.prop('hidden', false);

		$btnEdit.val($(this).find("td:first").text());
		$btnDelete.val($(this).find("td:first").text());
	}
});

function editProject() {
	const $selectedRow = $("#" + $("#btnEditProject").val());
	
	$("#prjId").val($selectedRow.find("td:eq(0)").text());
	$("#prjCode").val($selectedRow.find("td:eq(1)").text());
	$("#prjDesc").val($selectedRow.find("td:eq(2)").text());
	$("#prjOwner").val($selectedRow.find("td:eq(6)").text());
	$("#prjType").val($selectedRow.find("td:eq(3)").text());
	$("#prjStart").val($selectedRow.find("td:eq(4)").text());
	$("#prjEnd").val($selectedRow.find("td:eq(5)").text());
}

function deleteProject() {
	window.location.href = "/deleteProject/" + $("#btnDeleteProject").val();
}


//If an employee was clicked; DONE
//Note: Values here are based on table row indexes. Change these if indexes were altered.
$("#employeeTable tbody").on("click", "tr", function() {
	const $btnEdit = $("#btnEditEmployee");
	const $btnDelete = $("#btnDeleteEmployee");

	if ($(this).hasClass('table-active')) {
		
		$(this).removeClass('table-active');
		
		$btnEdit.prop('hidden', true);
		$btnDelete.prop('hidden', true);
		$btnEdit.removeAttr('value');
		$btnDelete.removeAttr('value');
	} else {
		
		$("#employeeTable tr.table-active").filter(function() {
			$(this).removeClass('table-active');
		});

		$(this).addClass('table-active');
		$btnEdit.prop('hidden', false);
		$btnDelete.prop('hidden', false);

		$btnEdit.val($(this).find("td:first").text());
		$btnDelete.val($(this).find("td:first").text());
	}
});

function editEmployee() {
	const $selectedRow = $("#" + $("#btnEditEmployee").val());

	$("#empId").val($selectedRow.find("td:eq(0)").text());
	$("#empFname").val($selectedRow.find("td:eq(1)").text());
	$("#empLname").val($selectedRow.find("td:eq(2)").text());
	$("#empRole").val($selectedRow.find("td:eq(5)").text());
	$("#empManager").val($selectedRow.find("td:eq(4)").text());
	$("#empUname").val($selectedRow.find("td:eq(3)").text());
	$("#empPass").val($selectedRow.find("td:eq(6)").text());
	$("#empConfPass").val($selectedRow.find("td:eq(6)").text());
}

function deleteEmployee() {
	window.location.href = "/deleteEmployee/" + $("#btnDeleteEmployee").val();
}
