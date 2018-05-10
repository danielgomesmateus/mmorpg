var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'db_game';

var connDB = function(data) {

	mongodb.connect(url, function(error, client) {

		assert.equal(null, error);

		const db = client.db(dbName);
		query(db, data);

		client.close();
	});
}

function query(db, data) {

	var collection = db.collection(data.collection);

	switch(data.option) {

		case 'insert':
			collection.insertOne(data.user, data.callback);
			break;
		case 'login':
			collection.findOne(data.user, data.callback);
			break;
		case 'select':
			collection.findOne(data.user, data.callback);
			break;
		case 'delete':
			collection.remove({_id: objectId(data.user)}, data.callback);
			break;
		case 'update':
			collection.update({user: data.user.user}, {$inc: {coin: data.user.coins}});
			break;
		case 'actions':
			collection.find({user: data.user['user'], ends_in: {$gt: data.user['ends_in']}}).toArray(data.callback);
		default:
			break;
	}
}

module.exports = function() {

	return connDB;
}
