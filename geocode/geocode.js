const request = require('request');

const googleApiKey = process.env.GOOGLE_API_KEY;

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  if (!googleApiKey) {
    return callback('ERROR - No google API key');
  }
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      return callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      return callback('Unable to find that address');
    } else if (body.status === 'OK') {
      return callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    } else {
      return callback(body.error_message);
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
