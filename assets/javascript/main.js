var apiUrl = {
	gif: `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=10`,
	band: `https://rest.bandsintown.com/artists/${searchTerm}?app_id=codingbootcamp`,
	movie: `https://www.omdbapi.com/?t=${searchTerm}&y=&plot=short&apikey=trilogy`
};
// $("#categoryList li").on("click", () => {
// 	this.addClass("active");
// 	queryURL = `${this.attr("data-name")}QueryURL`;
// 	// this.val().push($("#tagInput").val());
// });
//Object
// var category = {
// 	name: $("#categoryList li .active").attr("data-name"),
// 	searchTerm: $("#tagInput").val(),
// 	tagPool: [],
// 	queryUrl: `apiUrl.${this.name}`,
// 	renderTagPool: function() {
// 		for (let i = 0; i < tagPool.length; i++) {
// 			$("#tagPool").prepend(`<span>${tagPool[i]}</span>`);
// 		}
// 	},
// 	renderSearchResult: function() {}
// };

$("#searchBtn").on("click", function() {
	searchTerm = $("#tagInput")
		.val()
		.trim();
	console.log(apiUrl);
	console.log(searchTerm);
	var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=10`;
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
				$("#result").append(cardContainer.append(card.append(content)));
				// let content = `<img class="img-responsive" src= ${
				// 	results[i].images.fixed_height.url
				// }>`;
				// $("#result").append(card.append(content));
			}
		}
	});
});
function switchSrc(elem) {
	console.log("fuck this shit ");
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
//Mark the category that users pick

// var giphy = [];
// var band = [];
// var movie = [];
// var giphyQueryURL =
// 	"https://api.giphy.com/v1/gifs/search?q=" +
// 	searchTerm +
// 	"&api_key=dc6zaTOxFJmzC&limit=10";

// var movieQueryURL =
// 	"https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

// var bTownQueryURL =
// 	"https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
// $.ajax({
// 	url: queryURL,
// 	method: "GET"
// }).then(function(response) {
// 	console.log(response);
// });
