const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  const latitude = response.data.results[0].geometry.location.lat;
  const longitude = response.data.results[0].geometry.location.lng;

  const weatherApiWebsite = "https://api.darksky.net/forecast";
  const weatherApiKey = "ecb59825ee3e91da0a928dec0e1df6b6";  
  const weatherApiUrl = `${weatherApiWebsite}/${weatherApiKey}/${latitude},${longitude}`;

  console.log(response.data.results[0].formatted_address);

  return axios.get(weatherApiUrl);

}).then((response) => {
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.apparentTemperature;

  console.log(`The current temperature is ${temperature} but it feels like ${apparentTemperature}.`);    

}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(error.message);
  }
});

