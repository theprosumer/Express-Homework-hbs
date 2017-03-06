console.log('JS Loaded!');

$.ajax({
	url: '/home',
	dataType: 'json',
	type: 'GET',
	success: function(serverResponse){
		console.log(serverResponse);
	},
	error: function(err){
		console.log(err);
	}
})

$.ajax({
	url: '/home',
	type: 'POST',
	data: '{"uname": true, "alias": true, "url": true, "about": true}',
	success: function(serverResponse){
		console.log(serverResponse);
	},
	error: function(err){
		console.log(err);
	}
})