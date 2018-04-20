module.exports = function(app) {

	app.get('/register', function(request, response) {

		app.controllers.usersController.register(app, request, response);
	});

	app.post('/register', function(request, response) {

		app.controllers.usersController.register(app, request, response);
	});
}