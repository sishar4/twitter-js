var express = require('express');
var swig = require('swig');
var routes = require('./routes/');
var app = express(); //creates instance of express app


swig.setDefaults({ cache: false });
// swig.renderFile(__dirname + "/views/index.html", locals, function(err, output) {
// 	console.log(output);
// });

app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/', routes);
app.use(express.static('public'));

app.use(function (req, res, next) {
    // do your logging here
    console.log(req.method + ' ' + req.url);
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
});

app.listen(3000, function() {
	console.log('server listening');
});
