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
	        $('ul').prepend('<li class="list-group-item">' + toPost + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></li>');

	        //clear text in form once submitted
	        $('#inputPost').val('');

	        //increase post count and append to count div
			countPosts = countPosts + 1;
			$("#counter").text(" ").append("Posts: " + countPosts);

			var backgroundsIndex = Math.floor(Math.random() * (backgrounds.length));

			$('body').css({"background-color": backgrounds[backgroundsIndex]});

		} else {
			$('ul').prepend('<div class="alert alert-warning" class="close" data-dismiss="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><strong> Oh no!</strong> You forgot to write something...</div>');
		}
	   
    });

    //when you click the element, remove from list
    $(document).on('click', 'li', function () {
        $(this).remove();
        countPosts = countPosts - 1;
		$("#counter").text(" ").append("Posts: " + countPosts);
    });

    //draggable gumpy cat
    $('#grumpy').draggable();

    //sort the posts
    $('ul').sortable();

    //tried using affix img but found float left was easier
 	//$('img').affix-bottom({
 	//offset: 1
	//});

});