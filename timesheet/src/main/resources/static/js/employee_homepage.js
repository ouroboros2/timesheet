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
			$('<tr>', { id: "data" + taskListObjs[i].projectId }).append(cprojectId, cprojectDesc, cprojectCategory, cpInput)
		);

		var count = 0
		while (count < 7) {
			$("#" + "data" + taskListObjs[i].projectId).append("<td><input class='" + "parse" + taskListObjs[i].projectId + "' type='number' oninput='addHours()' min='1' max='24'></td>");
			count++;
		}

		$("#" + "data" + taskListObjs[i].projectId).append("<td>0</td>"); //total
		$("#" + "data" + taskListObjs[i].projectId).append("<td><i class=\"fas fa-trash-alt\"></i></td>"); //delete button; no function yet

		$("#" + "data" + taskListObjs[i].projectId).append(separator);
	}
	taskList = [];
	taskListObjs = [];
}


function addHours() {
	let col, rowsum;
	let row = 0;
	let colsum = [];

	$("#taskTable tr:gt(0)").each(function() {
		col = 0;
		rowsum = 0;
		row++;

		$(this).find("td:gt(2)").each(function() {
			$(this).find("input").each(function() {
				rowsum += Number($(this).val());

				if (row === 1)
					colsum[col] = Number($(this).val());
				else
					colsum[col] += Number($(this).val());

				populateSum(colsum);
			});

			col++;
			if (col === 8)
				$(this).text(rowsum);
		});
	});
}

function populateSum(colsum) {
	let sum = 0;
	let col = 0;

	$("#hoursBreakdownTable tr:nth-child(1)").each(function() {
		$(this).find("td").each(function() {

			if (col < colsum.length) {
				$(this).text(colsum[col]);
				sum += colsum[col];
			} else {
				$(this).text("Project Tasks (" + sum + " hrs)");
				$("#hoursBadge").text(sum + " hrs");
			}

			col++;
		});
	});
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
	data = data.replace(/[\[\]']+/g, '');
	var projects = data.split(",|,");

	for (var i = 0; i < projects.length; i++) {
		var entries = projects[i].split(",");
		var timeEntry;

		for (var n = 0; n < entries.length; n++) {
			timeEntry = {
				projectCode: entries[0],
				sunday: entries[1],
				monday: entries[2],
				tuesday: entries[3],
				wednesday: entries[4],
				thursday: entries[5],
				friday: entries[6],
				saturday: entries[7]
			}
		}
		saveTimeEntry(timeEntry);
	}
}


function returnJson() {

	alert("test");

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: window.location + "/returnJson",
		data: JSON.stringify(),
		dataType: "json",
		success: function(result) {
			alert(result);
		}
	})

	alert("test2");

}


function saveTimeEntry(timeEntry) {

	var url = "/viewTask/save";
	$.post({
		type: "POST",
		url: url,
		data: JSON.stringify(timeEntry),
		contentType: "application/json"
	}).done(function(someString) {
		$("#badgeStatus").removeClass('bg-secondary').addClass('bg-success');
		$("#badgeStatus").text("Submitted");

		$("#btnAdd").attr('disabled', true);
		$("#btnSubmit").attr('disabled', true);
		$("#taskTable input[type='number']").attr("disabled", true);

		//alert(someString);
	}).fail(function(xhr, textStatus, errorThrown) {
		alert("xhr: " + xhr.responseText);
		//alert("textStatus: " + textStatus);
		//alert("errorThrown: " + errorThrown);
	});

}


initDate();
addHours();


