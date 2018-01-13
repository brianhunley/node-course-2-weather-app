// darksky weather API key: ecb59825ee3e91da0a928dec0e1df6b6
// forecast request: https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// Englewood, OH: https://api.darksky.net/forecast/ecb59825ee3e91da0a928dec0e1df6b6/39.893846,-84.3226488

const request = require('request');

const url = "https://api.darksky.net/forecast/ecb59825ee3e91da0a928dec0e1df6b6/39.893846,-84.3226488";

request({
  url: url,
  json: true
}, (error, response, body) => {
  // use the following commended lines to see the results of the api call
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  if (error) {
    console.log('Error: Unable to connect to Forcast.io/Dark Sky servers.');
  } else if (response && response.statusCode === 400) {
    console.log(`Error: ${body.error}`);
  } else if (response && response.statusCode === 403) {
    console.log('Error: Invalid Forcast.io/Dark Sky API request.');
  } else if (response && response.statusCode === 200) {
    console.log(`The current temperature is ${body.currently.temperature} and it feels like ${body.currently.apparentTemperature}.`);
  }

  // alternative error code
  // if (!error && response.statusCode === 200) {
  //   console.log(body.currently.temperature);    
  // } else {
  //   console.log('Unable to fetch weather.');
  // }
});