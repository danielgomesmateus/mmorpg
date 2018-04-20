module.exports = function(app) {

	app.get('/game', function(request, response) {

		app.controllers.gameController.index(app, request, response);
	});
}	