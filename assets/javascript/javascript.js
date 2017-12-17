let topics = ["Capybara", "Hold my beer", "John Cena"]

function renderButtons() {
	$("#gifButtons").empty();
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topicButton");
		a.attr("topic", topics[i]);
		a.text(topics[i]);
		$("#gifButtons").append(a);
	}
}
renderButtons();

$("#addButton").on("click", function(e){
	e.preventDefault();
	let newTopic = $("#newTopicText").val();
	topics.push(newTopic);
	console.log(topics);
	renderButtons();
});

$("#gifButtons").on("click",'button', function(b) {
	b.preventDefault();
	console.log(this);
	let topicSearch = $(this).attr("topic");
  let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
  topicSearch + '&api_key=X9d5nd44VOLwpV7Jor9y3c7QsccZU1Up&limit=10';

  $.ajax({
  	url: queryURL,
    method: "GET"
  })
  .done(function(response) {
  	let results = response.data;
    console.log(results)
    for (let i = 0; i < results.length; i++) {
    	let gifDiv = $("<div class='item'>");
      let rating = results[i].rating;
      let p = $("<p>").text("Rating: " + rating);
      let topicImage = $('<img class="gif">');
      topicImage.attr("src", results[i].images.fixed_height_still.url);
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);
      topicImage.attr("data-animate", results[i].images.fixed_height.url);
      topicImage.attr("data-state", "still");
      gifDiv.prepend(topicImage);
      gifDiv.prepend(p);
      $("#responseGifs").prepend(gifDiv);
    }
  });
});

$("#responseGifs").on("click",".gif", function(c) {
	c.preventDefault();
	console.log(this);
	let state = $(this).attr("data-state");
  let stillImg = $(this).attr("data-still");
  let animateImg = $(this).attr("data-animate");
  if(state === "still"){
  	console.log(state);
    $(this).attr('src', animateImg);
    $(this).attr("data-state", "animate");
  }else if(state === "animate"){
    console.log(state);
    $(this).attr('src', stillImg);
    $(this).attr("data-state", "still");
  }
});
