module.exports.index = function(app, request, response) {

	if(request.session.authorized) {

		var validation = {msg: ''};
			
		if(request.query.error == 'cm_invalid') {

			validation = {msg: 'Comando inválido!'};
		}

		if(request.query.msg == 'cm_success') {

			validation = {msg: 'Comando executado com sucesso!'}
		}
		
		var data = {'user': request.session.user};

		var connDB = app.config.db;	
		var model = new app.app.models.gameModel(connDB);

		model.getParams(request, response, data, validation);
	}
	else {

		response.render('index', {validation: [{msg: 'É necessário logar para acessar esta página!'}]});
	}
}

module.exports.villagers = function(app, request, response) {

	if(request.session.authorized) {
		
		response.render('villagers', {});
	}
	else {

		response.render('index', {validation: [{msg: 'É necessário logar para acessar esta página!'}]});
	}
}

module.exports.scrolls = function(app, request, response) {

	if(request.session.authorized) {
		
		var connDB = app.config.db;
		var model = new app.app.models.gameModel(connDB);

		var data = {user: request.session.user};
		model.listActions(request, response, data);
	}
	else {

		response.render('index', {validation: [{msg: 'É necessário logar para acessar esta página!'}]});
	}
}

module.exports.action_villager = function(app, request, response) {

	if(request.session.authorized) {
		
		var dataForm = request.body;

		request.assert('action', 'Informe a ação desejada!').notEmpty();
		request.assert('quantity', 'Informe a quantidade desejada!').notEmpty();

		var errors = request.validationErrors();

		if(errors) {

			response.redirect('/game?error=cm_invalid');
			return;
		}

		var connDB = app.config.db;
		var model = new app.app.models.gameModel(connDB);

		model.actionVillager(request, response, dataForm);
	}
	else {

		response.render('index', {validation: [{msg: 'É necessário logar para acessar esta página!'}]});
	}
}