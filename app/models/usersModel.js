var crypto = require('crypto');

function UsersModel(connDB) {

	this._connDB = connDB;
}

UsersModel.prototype.register = function(data) {

	var password = crypto.createHash('md5').update(data.password).digest('hex');
	data.password = password;

	var params = {
		option: 'insert',
		user: data,
		collection: 'users',
		callback: function(error, result) {

			console.log("Registro gravado!");
		}
	};

	this._connDB(params);
}

UsersModel.prototype.login = function(request, response, data) {

	var password = crypto.createHash('md5').update(data.password).digest('hex');
	data.password = password;
	
	var params = {
		option: 'login',
		user: data,
		collection: 'users',
		callback: function(error, result) {

			if(result != null) {

				request.session.authorized = true;
				request.session.user = result.user;
				request.session.house = result.casa;

				response.redirect('/game');
			}
			else {

				request.session.authorized = false;
				response.render('index', {validation: [{msg: 'Erro ao realizar o login!. Dados de acesso inválidos!'}]});
			}
		}
	};

	this._connDB(params);
}

module.exports = function() {

	return UsersModel;
}
