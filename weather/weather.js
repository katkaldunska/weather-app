const request = require('request');

const darkSkyApiKey = process.env.DARKSKY_API_KEY;

var convertFahrenheitToCelsius = f => Math.round((f - 32) * (5/9) * 10) / 10;

var getWeather = (lat, lng, callback) => {
  if (!darkSkyApiKey) {
    return callback('ERROR - No Dark Sky API key');
  }
  request({
    url: `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      return callback(undefined, {
        temperature: convertFahrenheitToCelsius(body.currently.temperature),
        apparentTemperature: convertFahrenheitToCelsius(body.currently.apparentTemperature)
      });
    } else {
      return callback('Unable to fetch weather.');
    }
  });
};

module.exports.getWeather = getWeather;
