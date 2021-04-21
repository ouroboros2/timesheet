function getRole(role) {
	if (role.value === 'admin' || role.value === 'manager')
		$("#field_manager").hide();
	else if (role.value === 'employee')
		$("#field_manager").show();
}

function comparePass() {
	let pass = $("#pass").val();
	let confpass = $("#confpass").val();

	if (pass !== confpass) {
		$.confirm({
			title: '',
			content: 'Passwords doesn\'t match!',
			type: 'red',
			typeAnimated: true,
			buttons: {
				tryAgain: {
					text: 'Try again',
					btnClass: 'btn-red',
					action: function() {
					}
				}
			}
		});
		
		$("#submit").prop('disabled', true);
	}
	else
		$("#submit").prop('disabled', false);
}