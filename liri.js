var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var keys = require("./keys.js");
console.log(process.argv);

// Gets twitter keys from keys.js.
var clientKeys = keys.twitterKeys;



// Loop through band list and print out details
for (var key in clientKeys) {
    console.log(clientKeys[key]);
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


if (process.argv[2] === "my-tweets") {
    var twitterName = "kandacesweat";

    var params = { screen_name: twitterName, count: 20 };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });



}


if (process.argv[2] === "spotify-this-song") {

    var spotifySong = JSON.stringify(process.argv[3] + process.argv[4]);
    spotify.search({ type: 'track', query: spotifySong }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        // Do something with 'data' 
        console.log(JSON.stringify(data, null, 2));
    });
}