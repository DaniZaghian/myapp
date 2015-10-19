console.log("Sanity Check: JS is working!");

$(document).ready(function () {

	var backgrounds =['gray', 'dimgray', 'lightgray', 'plum', 'rebeccapurple', 'darkslateblue', 'mediumpurple', 'indigo', 'darkslategray', 'steelblue'];

	// find starting number of posts, append to count div
	var countPosts = 0;

	//grab the value from the input box
    $('form').on('submit', function(e) {
    	e.preventDefault();
   		var toPost = $('#inputPost').val();

        if (toPost) {
	        //on submit, append posted item to UL
	        var postData = {
	        	postText: toPost 
	        };
	        //post request to add new post
	        $.post("/api/posts", postData, function(resPost) {
		      // clear new post form
		      console.log(resPost);
		      var postString = makeHTMLString(resPost);
		      $("ul").prepend(postString);
		      // reset the form 
		      $("form")[0].reset();
		      // give focus back to the post name input
		      $("form").focus();
		    });

	 		upPostCounter();
			changeBackground();


			//put up an alert if the input is empty and user tries to submit
		} else {
			emptyAlert();
		}
	   
    });

    //when you click the element, remove from list
    $(document).on('click', 'li .glyphicon-remove', function (e) {
    	var postLi = $(this).closest('li');
    	deletePost(postLi);
        postLi.remove();
        countPosts = countPosts - 1;
		$("#counter").text(" ").append("Posts: " + countPosts);
    });

    $(document).on('click', 'li .post-text', function (e) {
    	var postLi = $(this).closest('li');
    	var postId = postLi.attr('data');
    	var url = "/post?id=" + postId;
    	window.location = url;
    });

    //delete post from the dom
	function deletePost(context) {
	  console.log('context in deletePost: ', context);
	  // context is the button that was clicked
	  var postId = $(context).attr('data');
	  $.ajax({
	    url: '/api/posts/' + postId,
	    type: 'DELETE'
	  });
	}

	function makeHTMLString(postObj){
	  return '<li class="list-group-item" data="'+ postObj._id +'"><div class="post-text">' + postObj.postText + '</div><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></li>';
	}

	function changeBackground(){
		var backgroundsIndex = Math.floor(Math.random() * (backgrounds.length));
		//change background colors every time you submit a post
		$('body').css({"background-color": backgrounds[backgroundsIndex]});
	}

	function upPostCounter() {
		//increase post count and append to count div
		countPosts = countPosts + 1;
		$("#counter").text(" ").append("Posts: " + countPosts);
	}

	function emptyAlert() {
		$('ul').prepend('<div class="alert alert-warning" class="close" data-dismiss="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><strong> Oh no!</strong> You forgot to write something...</div>');
	}

	function readPosts() {
		$.ajax({
	    url: '/api/posts',
	    type: 'GET',
	    complete: function(resPosts) {
	    	var posts = resPosts.responseJSON;
	    	console.log(posts);
	    	posts.forEach(function(post){
	    		console.log(post);
	    		displayPost(post);
	    	});
	    }
	  });
	}
	readPosts();

	function displayPost(resPost) {
		var postString = makeHTMLString(resPost);
		$("ul").prepend(postString);
	}

    //draggable gumpy cat
    $('#grumpy').draggable();

    //sort the posts
    $('ul').sortable();

    //tried using affix img but found float left was easier
 	//$('img').affix-bottom({
 	//offset: 1
	//});

});