function UsersModel(connDB) {

	this._connDB = connDB;
}

UsersModel.prototype.register = function(data) {

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

module.exports = function() {

	return UsersModel;
}