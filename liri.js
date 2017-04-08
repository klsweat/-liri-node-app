var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var keys = require("./keys.js");
var request = require('request');

//console.log(process.argv);

// Take two arguments.
// The second will be the amount that will be added, withdrawn, etc.
var processOne = process.argv[2];
var ProcessTwo = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (processOne) {
    case "my-tweets":
        mytwitter();
        break;

    case "spotify-this-song":
        var spotifySong = process.argv[3] + process.argv[4];
        spot();
        break;

    case "movie-this":
        movies();
        break;

    case "do-what-it-says":
        whatItSays();
        break;
}

function mytwitter() {

    // Gets twitter keys from keys.js.
    var clientKeys = keys.twitterKeys;

    // Loop through band list and print out details
    for (var key in clientKeys) {
        //console.log(clientKeys[key]);
        var consumer_key = clientKeys.consumer_key;
        var consumer_secret = clientKeys.consumer_secret;
        var access_token_key = clientKeys.access_token_key;
        var access_token_secret = clientKeys.access_token_secret;

    }

    var client = new Twitter({
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
        access_token_key: access_token_key,
        access_token_secret: access_token_secret
    });

    client.get('search/tweets', { q: 'oprah' }, function(error, tweets, response) {


        for (i = 0; i < 5; i++) {
            var created = tweets.statuses[i].created_at;
            var status = tweets.statuses[i].text;
            console.log("                ");
            console.log("----------------")
            console.log("----------------")

            console.log("Status: " + status);
            console.log("Date Created: " + created);

            console.log("----------------")
            console.log("----------------")
            console.log("                ");


        }


    });


}

function spot() {

    spotify.search({ type: 'track', query: spotifySong }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var apiInfo = data.tracks.items[0];

        // Do something with 'data' 
        //console.log(JSON.stringify(data, null, 2));
        if (spotifySong === "The Sign") {
            var artist = JSON.stringify(data.tracks.items[0].artists[0].name);
            var name = JSON.stringify(data.tracks.items[0].name);
            var link = JSON.stringify(data.tracks.items[0].external_urls.spotify);
            var album = JSON.stringify(data.tracks.items[0].album.name);
        } else {
            var artist = JSON.stringify(data.tracks.items[0].artists[0].name);
            var name = JSON.stringify(data.tracks.items[0].name);
            var link = JSON.stringify(data.tracks.items[0].external_urls.spotify);
            var album = JSON.stringify(data.tracks.items[0].album.name);
        }


        console.log("-------------");
        console.log("------------- \n");

        console.log(
            "Artist: " + artist + "\n" +
            "Song Name: " + name + "\n" +
            "Link Preview: " + link + "\n" +
            "Album Name: " + album + "\n"
        );

        console.log("-------------");
        console.log("-------------");

    });
}

function movies() {

    console.log(process.argv[3]);
    if (process.argv[3] === undefined) {
        var movieName = "Mr.Nobody";
        console.log("yes empty");
    } else {
        var movieName = process.argv[3];
        console.log("no not empty");
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            //console.log(JSON.parse(body));

            console.log("-------------");
            console.log("------------- \n");

            console.log(
                "Title: " + JSON.parse(body).Title + "\n" +
                "Year: " + JSON.parse(body).Year + "\n" +
                "IMDB Rating: " + JSON.parse(body).Rated + "\n" +
                "Country Produced In: " + JSON.parse(body).Country + "\n" +
                "Language: " + JSON.parse(body).Language + "\n" +
                "Plot: " + JSON.parse(body).Plot + "\n" +
                "Actors: " + JSON.parse(body).Actors + "\n" +
                "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n"

            );

            console.log("-------------");
            console.log("-------------");
        }


    });

}

function whatItSays() {

    // We will read the existing bank file
    fs.readFile("random.txt", "utf8", function(err, data) {
        console.log(data);
        var dataArr = data.split(", ");
        console.log(dataArr);

        spot();


    });


}