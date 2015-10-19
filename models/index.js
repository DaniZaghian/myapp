var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/micro-blog");

module.exports.Post = require("./post.js");

