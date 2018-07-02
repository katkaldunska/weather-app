const request = require('request');

const googleApiKey = process.env.GOOGLE_API_KEY;

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    if (!googleApiKey) {
      reject('ERROR - No google API key');
    }
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleApiKey}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      } else if (body) {
        reject(body.error_message);
      }
    });
  });
};

geocodeAddress('').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
