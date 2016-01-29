var express = require('express');
var app = express(); //creates instance of express app

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
  res.send('Hello World!');
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
