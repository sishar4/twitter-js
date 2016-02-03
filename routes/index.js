var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');

module.exports = function(io) {
	// parse application/x-www-form-urlencoded
	router.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	router.use(bodyParser.json());

	router.get('/', function(req, res) {
		var tweets = tweetBank.list();
		console.log(tweets[0].name);
		res.render('index', {title: 'Twitter.js', tweets: tweets, showForm: true});
	});

	router.get('/users/:name', function(req, res) {
		var name = req.params.name;
		var list = tweetBank.find({name: name});
		res.render('index', {title:'Twitter.js - Posts by ' + name, tweets: list, showForm: true, name: name});
	});

	router.get('/tweets/:uniqueID', function(req, res) {
		var tweetID = parseInt(req.params.uniqueID);
		var list = tweetBank.find({uniqueID: tweetID});
		res.render('index', {title:'Twitter.js - Post ID: ' + tweetID, tweets: list});
	});

	router.post('/tweets', function(req, res) {
		var name = req.body.name;
		var text = req.body.text;
		tweetBank.add(name, text);
		io.sockets.emit('new_tweet', {name: name, text: text});
		res.redirect('/');
	});	
	
	return router;
}