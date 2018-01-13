const request = require('request');

const getWeather = (latitude, longitude, callback) => {
  const apiUrl = "https://api.darksky.net/forecast";
  const apiKey = "ecb59825ee3e91da0a928dec0e1df6b6";
  
  const url = `${apiUrl}/${apiKey}/${latitude},${longitude}`;
  // console.log(url);

  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Error: Unable to connect to Forcast.io/Dark Sky servers.');
    } else if (response && response.statusCode === 400) {
      callback(`Error: ${body.error}`);
    } else if (response && response.statusCode === 403) {
      callback('Error: Invalid Forcast.io/Dark Sky API request.');
    } else if (response && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
      // callback(undefined, `The current temperature is ${body.currently.temperature} but it feels like ${body.currently.apparentTemperature}.`);
    }
  });
}

module.exports.getWeather = getWeather;