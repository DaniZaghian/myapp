// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require('path'),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
	db = require('./models');



// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use(express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.render('index');
});

// api route to get all posts (sanity check)
app.get("/api/posts", function (req, res){
 // get posts from db
 db.Post.find(function(err, posts){
    res.send(posts);
  });
});

app.get('/post', function (req, res) {
  res.render('post');
});

// api route to get all posts (sanity check)
app.get("/api/post/:id", function (req, res){
	var targetId = req.params.id;
 	// get post from db
 	db.Post.findById(targetId, function(err, post){
    res.json(post);
  });
});

// api route to create new post
app.post("/api/posts", function (req, res){
  var newPost = req.body;
   console.log(newPost);
   
    db.Post.create(newPost, function(err, post){
	    if (err) { return console.log("create error: " + err); }
	    console.log(post);
	    res.json(post);
	});
});


// api route to delete a post
// /api/posts/id1 --> req.params.id == id1
// /api/posts/iasflke --> req.params.id ==iasflke
app.delete("/api/posts/:id", function (req, res){
  // set the value of the id
  var targetId = req.params.id;

  console.log(targetId);

  db.Post.findOneAndRemove({_id:targetId}, function(err, deletedPost){
    if (err) { return console.log("delete error: " + err); }
    console.log(deletedPost + " removed");
    res.send(deletedPost);
   });
});


//listen at port
app.listen(3000, function (){
  console.log("listening on port 3000");
});
