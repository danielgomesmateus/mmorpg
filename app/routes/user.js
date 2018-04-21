module.exports = function(app) {

	app.get('/register', function(request, response) {

		app.app.controllers.usersController.register(app, request, response);
	});

	app.post('/register', function(request, response) {

		app.app.controllers.usersController.register(app, request, response);
	});

	app.post('/login', function(request, response) {

		app.app.controllers.usersController.login(app, request, response);
	});
}