var express = require('express');
var swig = require('swig');
var app = express(); //creates instance of express app

var locals = {
	title: "An Example",
	people: [
		{name: 'Gandalf'},
		{name: 'Frodo'},
		{name: 'Hermione'}
	]
};

swig.setDefaults({ cache: false });
swig.renderFile(__dirname + "/views/index.html", locals, function(err, output) {
	console.log(output);
});

app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(function (req, res, next) {
    // do your logging here
    console.log(req.method + ' ' + req.url);
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
});

app.use('/special/', function (req, res, next) {
    // do your logging here
    console.log("you reached the special area");
    console.log(res.get('Method') + ' ' + res.get('statusCode'));
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
});

app.get('/', function(req, res){
  	res.render('index', locals);
});

app.get('/news', function(req, res){
	res.send('Nothing');
});

app.get('/special/', function(req, res){
	res.send('Special');
});

app.listen(3000, function() {
	console.log('server listening');
});
