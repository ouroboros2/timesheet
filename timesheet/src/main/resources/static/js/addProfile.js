$('#field_type').change(function() {
	let role = $(this).val();
	
	if(role === 'admin' || role === 'manager') {
		$("#field_manager").hide();
	} else if(role === 'employee') {
		$("#field_manager").show();
	}
});

$('#field_confpass').focusout(function() {
	let pass = $('#field_pass').val();
	let pass2 = $('#field_confpass').val();
	if (pass !== pass2) {
		$.alert({
			title: 'Alert',
			content: 'Passwords doesn\'t match!',
		});

		$(':input[type="submit"]').prop('disabled', true);
	} else {
		$(':input[type="submit"]').prop('disabled', false);
	}
});

$('a.btn')
	.confirm(
		{
			title: '',
			content: 'Are you sure you want to cancel? Your inputs will not be saved.',

			buttons: {
				yes: function() {
					location.href = this.$target.attr('href');
				},
				no: {}
			}
		});