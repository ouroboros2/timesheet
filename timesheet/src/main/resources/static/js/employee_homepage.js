initDate();
addHours();

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


		cprojectId.textContent = taskListObjs[i].projectCode + ' ' + taskListObjs[i].projectId;
		cprojectDesc.textContent = taskListObjs[i].projectDesc;
		cprojectCategory.textContent = taskListObjs[i].projectCategory;
		cpInput.value = taskListObjs[i].projectId;
		cpInput.className = "parse" + taskListObjs[i].projectId;
		cpInput.hidden = true;
		separator.value = "|"
		separator.className = "parse" + taskListObjs[i].projectId;
		separator.hidden = true;

		$("#taskTable").append(
			$('<tr>', { id: "data" + taskListObjs[i].projectId }).append(cprojectId, cprojectDesc, cprojectCategory, cpInput)
		);

		var count = 0
		while (count < 7) {
			$("#" + "data" + taskListObjs[i].projectId).append("<td><input class='" + "parse" + taskListObjs[i].projectId + "' type='number' oninput='addHours()' min='1' max='24'></td>");
			count++;
		}

		$("#" + "data" + taskListObjs[i].projectId).append("<td>0</td>"); //total
		$("#" + "data" + taskListObjs[i].projectId).append("<td><button class='default-style delete-button gray-text-color' value='" + taskListObjs[i].projectId +
			"' onclick='deleteTask(this.value)'><i class=\"fas fa-trash-alt\"></i></td></button>");

		$("#" + "data" + taskListObjs[i].projectId).append(separator);
	}
	taskList = [];
	taskListObjs = [];
	$("#btnSubmit").prop('disabled', false);
}


function addHours() {
	var col, rowsum;
	var row = 0;
	var colsum = [];
	var tasksDonePerDay = [0, 0, 0, 0, 0, 0, 0];

	$("#taskTable tr:gt(0)").each(function() {
		col = 0;
		rowsum = 0;
		row++;

		$(this).find("td:gt(2)").each(function() {
			$(this).find("input").each(function() {
				let hour = Number($(this).val());
				rowsum += hour;

				if (row === 1)
					colsum[col] = hour;
				else
					colsum[col] += hour;

				if ($(this).val().trim() != '' && hour > 0)
					tasksDonePerDay[col]++;

				displayBreakdown(colsum, tasksDonePerDay);
			});

			col++;
			if (col === 8)
				$(this).text(rowsum);
		});
	});
}


function displayBreakdown(colsum, tasksDonePerDay) {
	var sum = 0;
	var col = 0;

	$("#hoursBreakdownTable tr:nth-child(1)").each(function() {
		$(this).find("td").each(function() {

			if (col < colsum.length) {
				$(this).text(colsum[col]);
				sum += colsum[col];
			} else {
				if (sum === 1) {
					$(this).text("Project Tasks (" + sum + " hr)");
					$("#hoursBadge").text(sum + " hr");
				} else {
					$(this).text("Project Tasks (" + sum + " hrs)");
					$("#hoursBadge").text(sum + " hrs");
				}
			}

			col++;
		});
	});

	$("#hoursBreakdownTable tr:nth-child(2)").each(function() {
		col = 0;
		$(this).find("td").each(function() {
			const task = Number(tasksDonePerDay[col]);

			if (!isNaN(task)) {

				if (task === 1)
					$(this).text(task + " task");
				else
					$(this).text(task + " tasks");
			}

			col++;
		});
	});
}

function resetBreakdown() {
	var col = 0;

	$("#hoursBreakdownTable tr:nth-child(1)").each(function() {
		$(this).find("td").each(function() {
			
			if (col < 7)
				$(this).text(0);
			else {
				$(this).text("Project Tasks (0 hrs)");
				$("#hoursBadge").text("0 hrs");
			}
			
			col++
		});
	});

	$("#hoursBreakdownTable tr:nth-child(2)").each(function() {
		$(this).find("td:not(:last-child)").each(function() {
			$(this).text("0 tasks");
		});
	});
	
	$("#btnSubmit").prop('disabled', true);
}


//datejs for date range --> see displayWeek() for formatted sql date
//github.com/datejs/Datejs --> see for documentation
var days = 0;
var begin, end;

function initDate() {
	if (Date.today().is().sunday())
		begin = new Date();
	else
		begin = new Date().last().sunday();

	if (Date.today().is().saturday())
		end = new Date();
	else
		end = new Date().next().saturday();

	displayWeek();
}

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
	const weekNumber = document.createElement('input');
	weekNumber.value = begin.getWeek();
	weekNumber.className = "parse";
	weekNumber.hidden = true;	
	$("#weekfromdate").append(weekNumber);
	
	
	//formatted date for db
	console.log(begin.toString("yyyy-MM-dd"));
	console.log(end.toString("yyyy-MM-dd"));
}


function deleteTask(taskId) {
	$.confirm({
		title: '',
		content: 'Are you sure you want to remove this from your timesheet?',
		type: 'red',
		typeAnimated: true,
		buttons: {
			yes: {
				text: 'Yes',
				action: function() {
					$("#task" + taskId).show();
					$("#data" + taskId).remove();

					if ($("#taskTable tbody").children().length !== 0)
						addHours();
					else
						resetBreakdown();
				}
			},
			no: {}
		}
	});
}


function insert() {
	var time = [];

	$('[class^="parse"]').map(function() {
		time.push($(this).val());
	});

	var data = JSON.stringify(time);
	data = data.replace(/\"/g, "");
	data = data.replace(/[\[\]']+/g, '');
	var projects = data.split(",|,");

	for (var i = 0; i < projects.length; i++) {
		var entries = projects[i].split(",");
		var timeEntry;

		for (var n = 0; n < entries.length; n++) {
			timeEntry = {
				weekNumber: entries[0],
				projectCode: entries[1],
				sunday: entries[2],
				monday: entries[3],
				tuesday: entries[4],
				wednesday: entries[5],
				thursday: entries[6],
				friday: entries[7],
				saturday: entries[8],
				employeeId: entries[9],
				managerId: entries[10]
			}
		}
		saveTimeEntry(timeEntry);
	}
}

function saveTimeEntry(timeEntry) {

	var url = "/viewTask/save";
	$.post({
		type: "POST",
		url: url,
		data: JSON.stringify(timeEntry),
		contentType: "application/json"
	}).done(function() {
		$("#badgeStatus").removeClass('bg-secondary').addClass('bg-success');
		$("#badgeStatus").text("Submitted");

		$("#billable button").prop('disabled', true);
		$("#nonbillable button").prop('disabled', true);
		$("#btnSubmit").prop('disabled', true);
		$("#taskTable").find("input,button").prop('disabled', true);
		$('#taskTable').removeClass('table-hover');

		//alert(someString);
	}).fail(function(xhr, textStatus, errorThrown) {
		alert("xhr: " + xhr.responseText);
		//alert("textStatus: " + textStatus);
		//alert("errorThrown: " + errorThrown);
	});

}

