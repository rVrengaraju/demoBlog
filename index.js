var express     =  require('express');
var app         =  express();
var bodyParser  =  require('body-parser');
var mongoose    = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true });


var blogSchema = new mongoose.Schema({
	author: String,
	text: String
});

var Post = mongoose.model("Post", blogSchema);

// Post.create({
// 	"author": "john",
// 	"text": "asdf"
// }, function(err, post){
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log(post);
// 	}
// });



app.get('/', function(req, res){
	res.redirect("/blog");
});

app.get('/blog', function(req, res){
	Post.find({}, function(err, posts){
		if(err){
			console.log(err);
		} else {
			res.render('posts', {posts: posts});
		}
	});
	
});


// app.get('/blog', function(req, res){
// 	res.render('posts', {blogData: blogData});
// });

app.get('/blog/new', function(req, res){
	res.render('enterText');
});

app.post('/blog', function(req, res){
	 var x = req.body["authorName"];
	 var y = req.body["textName"];
	 blogData.push({"author": x, "text": y});
	 res.render('posts', {blogData: blogData});
});


app.listen('3000', function(){
	console.log('localhost 3000 bih');
});