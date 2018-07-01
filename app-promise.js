
const yargs = require('yargs');
const axios = require('axios');

const googleApiKey = process.env.GOOGLE_API_KEY;
const darkSkyApiKey = process.env.DARKSKY_API_KEY;

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

  var convertFahrenheitToCelsius = f => Math.round((f - 32) * (5/9) * 10) / 10;

  argv.address = argv.address || 'Male';
  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`;

  axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response) => {
    var temperature = convertFahrenheitToCelsius(response.data.currently.temperature);
    var apparentTemperature = convertFahrenheitToCelsius(response.data.currently.apparentTemperature);
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
  }).catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.');
    } else {
      console.log(e.message);
    }
  });
