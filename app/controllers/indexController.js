module.exports.index = function(app, request, response) {
	
	var validation = {};
	
	response.render('index', {validation});
}