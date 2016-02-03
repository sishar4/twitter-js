var express = require('express');
var swig = require('swig');
var routes = require('./routes/');
var app = express(); //creates instance of express app
var socketio = require('socket.io');

swig.setDefaults({ cache: false });
// swig.renderFile(__dirname + "/views/index.html", locals, function(err, output) {
// 	console.log(output);
// });

app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(function (req, res, next) {
    // do your logging here
    console.log(req.method + ' ' + req.url);
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
});

var server = app.listen(3000, function() {
	console.log('server listening');
});

var io = socketio.listen(server);

app.use('/', routes(io));
app.use(express.static('public'));