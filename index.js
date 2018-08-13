var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


var blogData = [
	{"author": 'john',    'text': "asdf"},
	{"author": 'mike',    'text': "fdsa"},
	{"author": 'adrian',  'text': "1234"},
	{"author": 'wyatt',   'text': "jkl;"}
];


app.get('/', function(req, res){
	res.render('home');
});

app.get('/posts', function(req, res){
	res.render('posts', {blogData: blogData});
});

app.get('/enterText', function(req, res){
	res.render('enterText');
});

app.post('/enterText', function(req, res){
	 var x = req.body["authorName"];
	 var y = req.body["textName"];
	 blogData.push({"author": x, "text": y});
	 res.render('home');
});


app.listen('3000', function(){
	console.log('localhost 3000 bih');
});