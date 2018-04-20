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
		
		response.redirect('/game');
	}
}