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

gameModel.prototype.getParams = function(request, response, user) {
	
	var params = {
		option: 'select',
		user: user,
		collection: 'attrs',
		callback: function(error, result) {

			if(result != null) {

				response.render('game', {attrs: result, name: request.session.user, house: request.session.house});
			}
		}
	};

	this._connDB(params);
}

module.exports = function() {

	return gameModel;
}