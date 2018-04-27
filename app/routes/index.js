module.exports = function(app) {

	app.get('/', function(request, response) {
		
		app.app.controllers.indexController.index(app, request, response);
	});
}