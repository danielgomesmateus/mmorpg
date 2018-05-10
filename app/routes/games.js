module.exports = function(app) {

	app.get('/game', function(request, response) {

		app.app.controllers.gameController.index(app, request, response);
	});

	app.get('/villagers', function(request, response) {

		app.app.controllers.gameController.villagers(app, request, response);
	});

	app.get('/scrolls', function(request, response) {

		app.app.controllers.gameController.scrolls(app, request, response);
	});

	app.post('/action_villager', function(request, response) {

		app.app.controllers.gameController.action_villager(app, request, response);
	});

	app.get('/revoke/:id', function(request, response) {

		app.app.controllers.gameController.revokeOrder(app, request, response);
	});
}
