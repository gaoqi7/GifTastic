var searchTerm = "";
var cc = "giphy";
var bookmarkIcon = `<svg class = "bookmarkOverlay" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
		<path d="M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4zm0 30l-10-4.35L14 36V10h20v26z"/>
		<path d="M0 0h48v48H0z" fill="none"/>
	</svg>
	`;
// var bookmark = `
// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//     <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
//     <path d="M0 0h24v24H0z" fill="none"/>
// </svg>
// `;

//Object

function link() {
	$(".nav-link").removeClass("active");
	$(this).addClass("active");
	cc = $(".active").attr("data-name");
}

$(".nav-link").on("click", link);

$("#searchBtn").on("click", function() {
	searchTerm = $("#tagInput")
		.val()
		.trim();
	if (cc === "giphy") {
		renderGiphyResult();
	} else if (cc === "band") {
		renderBandResult();
	} else {
		renderMovieResult();
	}
});

//Giphy
function renderGiphyResult() {
	let queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=10`;
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		// Storing an array of results in the results variable
		var results = response.data;
		console.log(response);
		// Looping over every result item
		for (let i = 0; i < results.length; i++) {
			// Only taking action if the photo has an appropriate rating
			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				let cardContainer = $("<div class=\"col-lg-3 col-md-6\">");
				let card = $("<div class='card resultCard'>");
				let content = `<img class="card-img-top" data-state="still" data-animate=${
					results[i].images.fixed_height.url
				} data-still=${
					results[i].images.fixed_height_still.url
				} img-index="${i}" src= ${
					results[i].images.fixed_height_still.url
				} onclick="switchSrc(this)">`;

				// <div class="card-body">
				// <p class="card-text">Rating: ${results[i].rating}</p>
				// </div>`;
				$("#result").append(
					cardContainer.append(card.append(content, bookmarkIcon))
				);
			}
		}
	});
}
function switchSrc(elem) {
	// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
	var state = $(elem).attr("data-state");
	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
	// Then, set the image's data-state to animate
	// Else set src to the data-still value
	if (state === "still") {
		$(elem).attr("src", $(elem).attr("data-animate"));
		$(elem).attr("data-state", "animate");
	} else {
		$(elem).attr("src", $(elem).attr("data-still"));
		$(elem).attr("data-state", "still");
	}
}

function renderBandResult() {
	// Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
	let queryURL = `https://rest.bandsintown.com/artists/${searchTerm}?app_id=codingbootcamp`;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		// Printing the entire object to console
		console.log(response);

		// Constructing HTML containing the artist information
		//   var artistName = $("<h1>").text(response.name);
		//   var artistURL = $("<a>").attr("href", response.url).append(artistName);
		let cardContainer = $("<div class=\"col-lg-3 col-md-6\">");
		let card = $("<div class='card resultCard'>");
		let content = $("<img class='card-img-top'>").attr(
			"src",
			response.thumb_url
		);
		//   var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
		//   var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
		//   var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

		// Empty the contents of the artist-div, append the new artist content
		$("#result").append(
			cardContainer.append(card.append(content, bookmarkIcon))
		);
	});
}

function renderMovieResult() {
	var queryURL = `https://www.omdbapi.com/?t=${searchTerm}&y=&plot=short&apikey=trilogy`;
	console.log(queryURL);

	// Creating an AJAX call for the specific movie button being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response);

		// Creating a div to hold the movie
		//   var movieDiv = $("<div class='movie'>");

		// Storing the rating data
		//   var rating = response.Rated;

		// Creating an element to have the rating displayed
		//   var pOne = $("<p>").text("Rating: " + rating);

		// Displaying the rating
		//   movieDiv.append(pOne);

		// Storing the release year
		//   var released = response.Released;

		// Creating an element to hold the release year
		//   var pTwo = $("<p>").text("Released: " + released);

		// Displaying the release year
		//   movieDiv.append(pTwo);

		// Storing the plot
		//   var plot = response.Plot;

		// Creating an element to hold the plot
		//   var pThree = $("<p>").text("Plot: " + plot);

		// Appending the plot
		//   movieDiv.append(pThree);

		// Retrieving the URL for the image
		let imgURL = response.Poster;

		// Creating an element to hold the image
		let cardContainer = $("<div class=\"col-lg-3 col-md-6\">");
		let card = $("<div class='card resultCard'>");
		let content = `<img class="card-img-top" src=${imgURL}>`;

		// Appending the image
		$("#result").append(
			cardContainer.append(card.append(content, bookmarkIcon))
		);

		// Putting the entire movie above the previous movies
	});
}
