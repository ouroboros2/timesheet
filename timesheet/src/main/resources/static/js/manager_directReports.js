

function approve(obj) {
	var dto = [];
	var data = obj.id;
	//18|5568
	var taskIds = data.split("|");
	var customEmpSub = {
		weekNumber: taskIds[1],
		employeeId: taskIds[2]
	}
	
	dto.push(customEmpSub);
	dto.push(taskIds[0]);
	updateStatus(dto);
}

function reject(obj) {
	var dto = [];
	var data = obj.id;

	var taskIds = data.split("|");
	var customEmpSub = {
		weekNumber: taskIds[1],
		employeeId: taskIds[2]
	}
	
	dto.push(customEmpSub);
	dto.push(taskIds[0]);
	updateStatus(dto);

}

function updateStatus(dto) {

	var url = "/reject";
	//alert(JSON.stringify(dto[0]));
	//alert(JSON.stringify(dto[1]));
	if("approve" === dto[1]) {
		url = "/approve";
	}
	
	$.post({
		type: "POST",
		url: url,
		data: JSON.stringify(dto[0]),
		contentType: "application/json"
	}).done(function() {
		alert("success");
	}).fail(function(xhr, textStatus, errorThrown) {
		alert("xhr: " + xhr.responseText);
		//alert("textStatus: " + textStatus);
		//alert("errorThrown: " + errorThrown);
	});

}