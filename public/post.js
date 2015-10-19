console.log("Sanity Check: JS is working!");

$(document).ready(function () {

	var postId =location.search.split('id=')[1];
	console.log(postId);
	readPost(postId);

	//get a post from the back end
	function readPost(postId) {
	  $.ajax({
	    url: '/api/post/' + postId,
	    type: 'GET',
	    complete: function(resPost) {
	    	console.log(resPost.responseJSON);
	    	$('#post').html(resPost.responseJSON.postText);
	    }
	  });
	}
	//draggable gumpy cat
    $('#grumpy').draggable();
});