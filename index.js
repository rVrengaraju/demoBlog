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
	text: String,
	date: String
});


var Post = mongoose.model("Post", blogSchema);


app.get('/', function(req, res){
	res.redirect("/blog");
});

app.get('/blog', function(req, res){
	Post.find({}, function(err, posts){
		if(err){
			//error message found
			console.log(err);
			var error = err;
			res.render('error', {error: error});
		} else {
			res.render('posts', {posts: posts});
		}
	});
	
});




app.post('/blog', function(req, res){
	 var sentAuthor = req.body["authorName"];
	 var sentText = req.body["textName"];
	 var today = new Date(); 
	 var time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	 var sentDate = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + " " + time;
	 Post.create({
		"author": sentAuthor,
		"text": sentText,
		"date": sentDate
	}, function(err, posts){
		if(err){
			//error message found
			console.log(err);
			var error = err;
			res.render('error', {error: error});
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
			//error message found
			console.log(err);
			var error = err;
			res.render('error', {error: error});
		} else {
			res.render('show', {post: post})
		}
	});
	
});

app.get('/delete/:id', function(req, res){
	var id = req.params.id;
	Post.findByIdAndRemove(id, function(){
		res.redirect('/blog');
	}); 
});






app.listen('3000', function(){
	console.log('localhost 3000 bih');
});

