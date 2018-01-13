const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

  request({
    url: url,
    json: true
  }, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.    
  
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === "ZERO_RESULTS" || body.status === "INVALID_REQUEST") {
      callback('Unable to find that address');
    } else if (body.status === "OK") {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng        
      });
    }
  });    
};

module.exports.geocodeAddress = geocodeAddress;