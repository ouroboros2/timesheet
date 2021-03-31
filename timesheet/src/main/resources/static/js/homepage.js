function addToTimesheet() {
		getCheckedTasks();	
}

function getCheckedTasks() {
	
	var taskList = [];
	var taskListObjs = [];
	$('input[name=tasks]:checked').map(function() {
		taskList.push($(this).val());
	
	for(var i= 0; i<taskList.length; i++) {
		
		var taskDetails = taskList[i].split("-");
		var taskobj = {
			projectCode:taskDetails[0],
			projectId:taskDetails[1],
			projectDesc:taskDetails[2],
			projectCategory:taskDetails[3]
			
		}
		taskListObjs.push(taskobj);
	}
	
	for(var i= 0; i<taskListObjs.length; i++) {
		
		const cprojectId = document.createElement('td');
		const cprojectDesc = document.createElement('td');
		const cprojectCategory = document.createElement('td');
		
		//comment here
		cprojectId.textContent = taskListObjs[i].projectCode + taskListObjs[i].projectId;
		cprojectDesc.textContent = taskListObjs[i].projectDesc;
		cprojectCategory.textContent = taskListObjs[i].projectCategory;
		
		$("#taskTable").append(
			$('<tr>', {id: "data" + taskListObjs[i].projectId}).append(cprojectId, cprojectDesc, cprojectCategory)
		);
		
		var count = 0
		while(count < 7) {
			$("#" + "data" + taskListObjs[i].projectId).append("<td><input size='2'></td>");	
			count++;
		}
	}
	taskList = [];
});
	
}