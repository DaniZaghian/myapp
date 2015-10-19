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


// api route to get all posts (sanity check)
app.get("/api/posts", function (req, res){
 // get posts from db
 db.Post.find(function(err, posts){
    res.send(posts);
  });
});

app.get('/', function (req, res) {
  res.render('index');
});

// api route to create new post
app.post("/api/posts", function (req, res){
  var newPost = req.body;
   console.log(newPost);
   
    db.Post.create(newPost, function(err, post){
	    if (err) { return console.log("create error: " + err); }
	    console.log("created ", post.postText);
	    res.json(post);
	});
});

//listen at port
app.listen(3000, function (){
  console.log("listening on port 3000");
});
