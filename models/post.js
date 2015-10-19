var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    postText: String,
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;