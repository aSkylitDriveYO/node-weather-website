const request = require('request');

const forecast = (lat, long, callback) => {
  const url =
    'https://api.weatherbit.io/v2.0/current?key=e6134c8f020a4837a0687f74cf278e93&units=I&lat=' +
    lat +
    '&lon=' +
    long;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to service', undefined);
    } else if (body.error) {
      callback('unable to find location', undefined);
    } else {
      callback(
        undefined,
        'it is ' + body.data[0].temp + ' degrees outside in'
      );
    }
  });
};

module.exports = forecast;
