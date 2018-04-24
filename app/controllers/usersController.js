module.exports.register = function(app, request, response) {

	var user = request.body;
	var errors = {validacao: ''};

	if(request.method == 'POST') {
		
		request.assert('name', 'Informe o seu nome completo!').notEmpty();
		request.assert('user', 'Informe o seu nome de usuário!').notEmpty();
		request.assert('password', 'Informe uma senha válida!').notEmpty();
		request.assert('password', 'Informe uma senha com mínimo de 6 dígitos e máximo de 10 dígitos!').len(6, 10);
		request.assert('casa', 'Escolha sua casa!').notEmpty();

		errors = request.validationErrors();
	}

	if(errors) {
		
		response.render('register', {validacao: errors, user: user});
	}
	else {
		
		var connDB = app.config.db;

		var model = new app.app.models.usersModel(connDB);
		model.register(user);

		var modelGame = new app.app.models.gameModel(connDB);
		modelGame.setParams(request.body.user);

		response.render('index', {validation: [{msg: 'Realize o login para acessar o jogo!'}]});
	}
}

module.exports.login = function(app, request, response) {
	
	var user = request.body;

	request.assert('user', 'Informe o nome de usuário!').notEmpty();
	request.assert('password', 'Informe a senha de acesso!').notEmpty();

	var errors = request.validationErrors();

	if(errors) {

		response.render('index', {validation: errors});
		return;
	}
	else {

		var connDB = app.config.db;
		var model = new app.app.models.usersModel(connDB);

		model.login(request, response, user);
	}
}

module.exports.logout = function(app, request, response) {

	request.session.destroy(function(error) {

		response.render('index', {validation: [{msg: 'Você foi deslogado com sucesso!'}]});
	});
}