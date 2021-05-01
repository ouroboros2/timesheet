function hasEmpty() {
	var empty = false;
	
	$("form :input, textarea").each(function() {
		if ($.trim($(this).val()) === '') {
			if (this.id !== "field_manager")
				empty = true;
		}
	});
	
	return empty;
}

function validate() {
	if (hasEmpty()) {
		$.confirm({
			title: '',
			content: 'Unable to add record. Please check your inputs.',
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

	} else {
		$.confirm({
			title: '',
			content: 'Record added successfully',
			type: 'green',
			typeAnimated: true,
			buttons: {
				ok: {
					text: 'OK',
					btnClass: 'btn-green',
					action: function() {
						$("form").submit();
					}
				}
			}
		});
	}
}

function redirect() {
	if (hasEmpty())
		$(location).attr('href', '#') /*change this to dashboard*/
	else {
		$.confirm({
			title: '',
			content: 'Are you sure you want to cancel? Your inputs will not be saved.',
			type: 'orange',
			typeAnimated: true,
			buttons: {
				yes: {
					text: 'Yes',
					action: function() {
						$(location).attr('href', '#') /*change this to dashboard*/
					}
				},
				no: {}
			}
		});	
	}
}