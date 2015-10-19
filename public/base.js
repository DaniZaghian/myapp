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
	        //$('ul').prepend('<li class="list-group-item">' + toPost + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></li>');

	        //clear text in form once submitted
	        var postData = {
	        	postText: toPost 
	        };
	        //post request to add new post
	        $.post("/api/posts", postData, function(response){
		      // clear new post form
		      console.log(response);
		      var postString = makeHTMLString(toPost);
		      $("ul").prepend(postString);
		      // reset the form 
		      $("form")[0].reset();
		      // give focus back to the post name input
		      $("form").focus();
		    });

	        //increase post count and append to count div
			countPosts = countPosts + 1;
			$("#counter").text(" ").append("Posts: " + countPosts);

			var backgroundsIndex = Math.floor(Math.random() * (backgrounds.length));
			//change background colors every time you submit a post
			$('body').css({"background-color": backgrounds[backgroundsIndex]});

			//put up an alert if the input is empty and user tries to submit
		} else {
			$('ul').prepend('<div class="alert alert-warning" class="close" data-dismiss="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><strong> Oh no!</strong> You forgot to write something...</div>');
		}
	   
    });

    //when you click the element, remove from list
    $(document).on('click', 'li', function (e) {
        $(this).remove();
        deletePost(this);
        countPosts = countPosts - 1;
		$("#counter").text(" ").append("Posts: " + countPosts);
    });

    //delete post from the dom
	function deletePost(context) {
	  console.log('context in deletePost: ', context);
	  // context is the button that was clicked
	  var postId = $(context).data().id;
	  $.ajax({
	    url: '/api/posts/' + postId,
	    type: 'DELETE'
	  });
	}

	function makeHTMLString(toPost){
	  return '<li class="list-group-item">' + toPost + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></li>';
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