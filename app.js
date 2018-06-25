const request = require('request');

const googleApiKey = 'AIzaSyAXor0x9xSEwP-ju9o7YOdxuGX9yPl6X7E';

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=straganiarska%202&key${googleApiKey}`,
  json: true
}, (error, response, body) => {
  console.log(body);
});
