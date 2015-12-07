var express  = require('express');
var app      = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendfile('./public/index.html');
});

app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");