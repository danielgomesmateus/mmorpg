var app = require('./config/server.js')();

app.listen('8000', function() {
	console.log("Servidor NODEJS - http://localhost:8000");
});