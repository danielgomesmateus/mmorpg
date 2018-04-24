module.exports.index = function(app, request, response) {

	if(request.session.authorized) {

		var data = {'user': request.session.user};
		var connDB = app.config.db;
	
		var model = new app.app.models.gameModel(connDB);
		model.getParams(request, response, data);
	}
	else {

		response.render('index', {validation: [{msg: 'É necessário logar para acessar esta página!'}]});
	}
}