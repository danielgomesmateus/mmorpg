function gameModel(connDB) {

	this._connDB = connDB;
}

gameModel.prototype.setParams = function(user) {

	var data = {
		user: user,
		coin: 100,
		subjects: 10,
		fear: Math.floor(Math.random() * 1000),
		wisdom: Math.floor(Math.random() * 1000),
		trade: Math.floor(Math.random() * 1000),
		magic: Math.floor(Math.random() * 1000)
	};

	var params = {
		option: 'insert',
		user: data,
		collection: 'attrs',
		callback: function(error, result) {

			console.log("Atributos gerados!");
		}
	};

	this._connDB(params);
}

gameModel.prototype.getParams = function(request, response, user, validation) {

	var params = {
		option: 'select',
		user: user,
		collection: 'attrs',
		callback: function(error, result) {

			if(result != null) {

				response.render('game', {attrs: result, name: request.session.user, house: request.session.house, validation});
			}
		}
	};

	this._connDB(params);
}

gameModel.prototype.actionVillager = function(request, response, dataForm) {

	var time = null;
	var coins = null;

	switch(parseInt(dataForm.action)) {

		case 1:
			time = 1 * 60 * 60000;
			coins = 2 * parseInt(dataForm.quantity);
			break;
		case 2:
			time = 2 * 60 * 60000;
			coins = 3 * parseInt(dataForm.quantity);
			break;

		case 3:
			time = 5 * 60 * 60000;
			coins = 1 * parseInt(dataForm.quantity);
			break;

		case 4:
			time = 5 * 60 * 60000;
			coins = 1 * parseInt(dataForm.quantity);
			break;
	}

	var date = new Date();

	dataForm.user = request.session.user;
	dataForm.ends_in = date.getTime() + time;

	var params = {
		option: 'insert',
		user: dataForm,
		collection: 'actions',
		callback: function(error, result) {

			if(result != null) {

				response.redirect('/game?msg=cm_success');
			}
		}
	};
	this._connDB(params);

	dataForm = "";
	dataForm = {
		user: request.session.user,
		coins: -1 * coins
	};

	var params = {
		option: 'update',
		user: dataForm,
		collection: 'attrs',
		callback: function(error, result) {

			if(result != null) {

				response.redirect('/game?msg=cm_success');
			}
		}
	};
	this._connDB(params);
}

gameModel.prototype.listActions = function(request, response, data) {

	var date = new Date();
	data['ends_in'] = date.getTime();

	var params = {
		option: 'actions',
		user: data,
		collection: 'actions',
		callback: function(error, result) {

			if(result != null) {
				response.render('scrolls', {actions: result});
			}
		}
	}
	this._connDB(params);
}

gameModel.prototype.revokeOrder = function(request, response, id) {

	var params = {
		option: 'delete',
		user: id,
		collection: 'actions',
		callback: function(error, result) {
			response.redirect('/game');
		}
	}
	this._connDB(params);
}

module.exports = function() {

	return gameModel;
}
