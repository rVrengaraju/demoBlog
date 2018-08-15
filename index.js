var express     =  require('express');
var app         =  express();
var bodyParser  =  require('body-parser');
var mongoose    = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true });


var blogSchema = new mongoose.Schema({
	author: String,
	text: String
});

var Post = mongoose.model("Post", blogSchema);



app.get('/', function(req, res){
	res.redirect("/blog");
});

app.get('/blog', function(req, res){
	Post.find({}, function(err, posts){
		if(err){
			//change this to proper error message page
			console.log(err);
		} else {
			res.render('posts', {posts: posts});
		}
	});
	
});


app.post('/blog', function(req, res){
	 var sentAuthor = req.body["authorName"];
	 var sentText = req.body["textName"];
	 Post.create({
		"author": sentAuthor,
		"text": sentText
	}, function(err, posts){
		if(err){
			// change this to the proper error page
			console.log(err)
		} else {
			res.redirect('/blog');
		}
	});
});

app.get('/blog/new', function(req, res){
	res.render('enterText');
});


app.get('/blog/:id', function(req, res){
	var id = req.params.id;
	Post.findById(id, function(err, post){
		if(err){
			// change this to proper error message
			res.redirect('/blog');
		} else {
			res.render('show', {post: post})
		}
	});
	
});





app.listen('3000', function(){
	console.log('localhost 3000 bih');
});

