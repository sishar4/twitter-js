var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
	var tweets = tweetBank.list();
	console.log(tweets[0].name);
	res.render('index', {title: 'Twitter.js', tweets: tweets});
});

router.get('/users/:name', function(req, res) {
	var name = req.params.name;
	var list = tweetBank.find({name: name});
	res.render('index', {title:'Twitter.js - Posts by ' + name, tweets: list});
});

router.get('/tweets/:uniqueID', function(req, res) {
	var tweetID = parseInt(req.params.uniqueID);
	console.log(tweetID);
	var list = tweetBank.find({uniqueID: tweetID});
	res.render('index', {title:'Twitter.js - Post ID: ' + tweetID, tweets: list});
});

module.exports = router;